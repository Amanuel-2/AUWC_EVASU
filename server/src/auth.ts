import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findTeamBySlug, getDb } from "./db.js";
import { config } from "./config.js";
import { AuthUser, MembershipDocument, UserDocument } from "./types.js";
import { id } from "./utils.js";

declare global {
  namespace Express { interface Request { authUser?: AuthUser } }
}

export function signAccessToken(user: UserDocument, teamIds: string[]) {
  return jwt.sign({ sub: user._id?.toString(), email: user.email, role: user.role, teamIds }, config.JWT_SECRET, { expiresIn: "30m" });
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : "";
    if (!token) return res.status(401).json({ message: "Authentication required." });
    const payload = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
    const userId = typeof payload.sub === "string" ? id(payload.sub) : null;
    if (!userId) return res.status(401).json({ message: "Invalid authentication token." });
    const db = await getDb();
    const user = await db.collection<UserDocument>("users").findOne({ _id: userId });
    if (!user) return res.status(401).json({ message: "User account no longer exists." });
    const memberships = await db.collection<MembershipDocument>("memberships").find({ userId, status: "active" }).toArray();
    const teamDocuments = await db.collection("teams").find({ _id: { $in: memberships.map((membership) => membership.teamId) } }).project<{ slug: string }>({ slug: 1 }).toArray();
    req.authUser = { id: userId.toString(), email: user.email, role: user.role, teamIds: teamDocuments.map((team) => team.slug) };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired authentication token." });
  }
}

export function requireRole(...roles: UserDocument["role"][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser || !roles.includes(req.authUser.role)) return res.status(403).json({ message: "You do not have permission to perform this action." });
    next();
  };
}

export async function requireTeamAccess(req: Request, res: Response, next: NextFunction) {
  const teamId = String(req.params.teamId);
  if (req.authUser?.role === "admin") return next();
  const team = await findTeamBySlug(teamId);
  if (team && req.authUser?.teamIds.includes(team.slug)) return next();
  return res.status(403).json({ message: "You do not have access to this team." });
}
