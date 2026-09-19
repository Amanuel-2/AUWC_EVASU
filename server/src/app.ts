import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { findTeamBySlug, getDb } from "./db.js";
import { config } from "./config.js";
import { requireAuth, requireRole, requireTeamAccess, signAccessToken } from "./auth.js";
import { AttendanceDocument, MembershipDocument, TeamDocument, UserDocument } from "./types.js";
import { id, normalizeEmail, publicUser, serialize } from "./utils.js";

const app = express();
app.use(cors({ origin: config.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));

const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
const registerSchema = z.object({ name: z.string().trim().min(2), email: z.string().email(), password: z.string().min(1), phone: z.string().trim().max(40).optional().default(""), yearOfStudy: z.string().trim().max(40).optional().default(""), gender: z.string().trim().max(40).optional().default("") });
const scheduleSchema = z.object({ day: z.string().trim().min(1), time: z.string().trim().min(1), location: z.string().trim().min(1) });
const attendanceSchema = z.object({ meetingDate: z.string().date(), statuses: z.record(z.enum(["Present", "Absent", "Late", "Excused"])) });
const teamSchema = z.object({ slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), name: z.string().trim().min(2), tagline: z.string().trim().min(2), description: z.string().trim().min(2), isPublic: z.boolean().default(true), color: z.string().trim().default("#8B5CF6"), schedule: z.array(scheduleSchema).default([]) });

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body);
    const db = await getDb();
    const email = normalizeEmail(input.email);
    const exists = await db.collection<UserDocument>("users").findOne({ email });
    if (exists) return res.status(409).json({ message: "An account with this email already exists." });
    const now = new Date();
    const user: UserDocument = { name: input.name, email, passwordHash: await bcrypt.hash(input.password, 12), role: "member", phone: input.phone, yearOfStudy: input.yearOfStudy, gender: input.gender, avatarUrl: "", createdAt: now, updatedAt: now };
    const result = await db.collection<UserDocument>("users").insertOne(user);
    user._id = result.insertedId;
    return res.status(201).json({ user: publicUser(user), accessToken: signAccessToken(user, []) });
  } catch (error) { return next(error); }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const input = credentialsSchema.parse(req.body);
    const db = await getDb();
    const user = await db.collection<UserDocument>("users").findOne({ email: normalizeEmail(input.email) });
    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) return res.status(401).json({ message: "Invalid email or password." });
    const memberships = await db.collection<MembershipDocument>("memberships").find({ userId: user._id, status: "active" }).toArray();
    const teamDocuments = await db.collection<TeamDocument>("teams").find({ _id: { $in: memberships.map((membership) => membership.teamId) } }).project({ slug: 1 }).toArray();
    return res.json({ user: publicUser(user), accessToken: signAccessToken(user, teamDocuments.map((team) => team.slug)) });
  } catch (error) { return next(error); }
});

app.get("/api/auth/me", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    const user = await db.collection<UserDocument>("users").findOne({ _id: id(req.authUser!.id)! });
    if (!user) return res.status(404).json({ message: "User not found." });
    const memberships = await db.collection<MembershipDocument>("memberships").find({ userId: user._id, status: "active" }).toArray();
    const teamDocuments = await db.collection<TeamDocument>("teams").find({ _id: { $in: memberships.map((membership) => membership.teamId) } }).project({ slug: 1 }).toArray();
    return res.json({ user: publicUser(user), teamIds: teamDocuments.map((team) => team.slug) });
  } catch (error) { return next(error); }
});

app.get("/api/me/teams", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    const memberships = await db.collection<MembershipDocument>("memberships").find({ userId: id(req.authUser!.id)!, status: "active" }).toArray();
    const teams = await db.collection<TeamDocument>("teams").find({ _id: { $in: memberships.map((membership) => membership.teamId) } }).toArray();
    return res.json(serialize(teams));
  } catch (error) { return next(error); }
});

app.get("/api/admin/users", requireAuth, requireRole("admin"), async (_req, res, next) => {
  try {
    const db = await getDb();
    return res.json(serialize(await db.collection<UserDocument>("users").find({}, { projection: { passwordHash: 0 } }).sort({ createdAt: -1 }).toArray()));
  } catch (error) { return next(error); }
});

app.get("/api/admin/teams", requireAuth, requireRole("admin"), async (_req, res, next) => {
  try {
    const db = await getDb();
    return res.json(serialize(await db.collection<TeamDocument>("teams").find({}).sort({ name: 1 }).toArray()));
  } catch (error) { return next(error); }
});

app.post("/api/admin/teams", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const input = teamSchema.parse(req.body);
    const db = await getDb();
    const now = new Date();
    const team: TeamDocument = { ...input, createdAt: now, updatedAt: now };
    const result = await db.collection<TeamDocument>("teams").insertOne(team);
    team._id = result.insertedId;
    return res.status(201).json(serialize(team));
  } catch (error) { return next(error); }
});

app.patch("/api/admin/teams/:teamId", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const input = teamSchema.partial().parse(req.body);
    const db = await getDb();
    const result = await db.collection<TeamDocument>("teams").findOneAndUpdate({ slug: String(req.params.teamId) }, { $set: { ...input, updatedAt: new Date() } }, { returnDocument: "after" });
    if (!result) return res.status(404).json({ message: "Team not found." });
    return res.json(serialize(result));
  } catch (error) { return next(error); }
});

app.post("/api/admin/teams/:teamId/leaders", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const input = z.object({ userId: z.string().optional(), email: z.string().email().optional() }).refine((value) => value.userId || value.email, "userId or email is required").parse(req.body);
    const db = await getDb();
    const team = await findTeamBySlug(String(req.params.teamId));
    const user = input.userId ? await db.collection<UserDocument>("users").findOne({ _id: id(input.userId) ?? undefined }) : await db.collection<UserDocument>("users").findOne({ email: normalizeEmail(input.email!) });
    if (!team?._id || !user?._id) return res.status(404).json({ message: "Team or user not found." });
    await db.collection<UserDocument>("users").updateOne({ _id: user._id }, { $set: { role: "team_leader", updatedAt: new Date() } });
    await db.collection<MembershipDocument>("memberships").updateOne({ userId: user._id, teamId: team._id }, { $set: { status: "active", joinedAt: new Date() } }, { upsert: true });
    return res.json({ message: "Leader assigned successfully." });
  } catch (error) { return next(error); }
});

app.get("/api/teams", async (req, res, next) => {
  try {
    const db = await getDb();
    const filter = req.authUser?.role === "admin" ? {} : { isPublic: true };
    return res.json(serialize(await db.collection<TeamDocument>("teams").find(filter).sort({ name: 1 }).toArray()));
  } catch (error) { return next(error); }
});

app.get("/api/teams/:teamId", async (req, res, next) => {
  try {
    const db = await getDb();
    const team = await db.collection<TeamDocument>("teams").findOne({ slug: String(req.params.teamId), ...(req.authUser?.role === "admin" ? {} : { isPublic: true }) });
    if (!team) return res.status(404).json({ message: "Team not found." });
    return res.json(serialize(team));
  } catch (error) { return next(error); }
});

app.post("/api/teams/:teamId/join", requireAuth, async (req, res, next) => {
  try {
    const db = await getDb();
    const team = await findTeamBySlug(String(req.params.teamId));
    const teamId = team?._id;
    if (!teamId || !team.isPublic) return res.status(404).json({ message: "Public team not found." });
    await db.collection<MembershipDocument>("memberships").updateOne({ userId: id(req.authUser!.id)!, teamId }, { $setOnInsert: { userId: id(req.authUser!.id)!, teamId, joinedAt: new Date() }, $set: { status: "active" } }, { upsert: true });
    return res.status(201).json({ message: "You joined the team." });
  } catch (error) { return next(error); }
});

app.get("/api/teams/:teamId/members", requireAuth, requireTeamAccess, async (req, res, next) => {
  try {
    const db = await getDb();
    const teamId = (await findTeamBySlug(String(req.params.teamId)))?._id;
    if (!teamId) return res.status(404).json({ message: "Team not found." });
    const memberships = await db.collection<MembershipDocument>("memberships").find({ teamId, status: "active" }).toArray();
    const users = await db.collection<UserDocument>("users").find({ _id: { $in: memberships.map((membership) => membership.userId) } }).project({ passwordHash: 0 }).toArray();
    return res.json(serialize(users));
  } catch (error) { return next(error); }
});

app.get("/api/teams/:teamId/schedule", requireAuth, requireTeamAccess, async (req, res, next) => {
  try {
    const db = await getDb();
    const team = await findTeamBySlug(String(req.params.teamId));
    if (!team) return res.status(404).json({ message: "Team not found." });
    return res.json(serialize(team.schedule[0] ?? null));
  } catch (error) { return next(error); }
});

app.patch("/api/teams/:teamId/schedule", requireAuth, requireTeamAccess, async (req, res, next) => {
  try {
    const input = scheduleSchema.parse(req.body);
    const db = await getDb();
    const result = await db.collection<TeamDocument>("teams").findOneAndUpdate({ slug: String(req.params.teamId) }, { $set: { schedule: [input], updatedAt: new Date() } }, { returnDocument: "after" });
    if (!result) return res.status(404).json({ message: "Team not found." });
    return res.json(serialize(result.schedule[0]));
  } catch (error) { return next(error); }
});

app.get("/api/teams/:teamId/attendance", requireAuth, requireTeamAccess, async (req, res, next) => {
  try {
    const db = await getDb();
    const team = await findTeamBySlug(String(req.params.teamId));
    if (!team?._id) return res.status(404).json({ message: "Team not found." });
    return res.json(serialize(await db.collection<AttendanceDocument>("attendance").find({ teamId: team._id }).sort({ meetingDate: -1 }).toArray()));
  } catch (error) { return next(error); }
});

app.post("/api/teams/:teamId/attendance", requireAuth, requireRole("admin", "team_leader"), requireTeamAccess, async (req, res, next) => {
  try {
    const input = attendanceSchema.parse(req.body);
    const db = await getDb();
    const teamId = (await findTeamBySlug(String(req.params.teamId)))?._id;
    if (!teamId) return res.status(400).json({ message: "Invalid team ID." });
    const memberIds = new Set((await db.collection<MembershipDocument>("memberships").find({ teamId, status: "active" }).toArray()).map((membership) => membership.userId.toString()));
    if (Object.keys(input.statuses).some((memberId) => !memberIds.has(memberId))) return res.status(400).json({ message: "Attendance contains a member outside this team." });
    const attendance: AttendanceDocument = { teamId, meetingDate: input.meetingDate, markedBy: id(req.authUser!.id)!, markedAt: new Date(), statuses: input.statuses };
    await db.collection<AttendanceDocument>("attendance").replaceOne({ teamId, meetingDate: input.meetingDate }, attendance, { upsert: true });
    return res.status(201).json(serialize(attendance));
  } catch (error) { return next(error); }
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof z.ZodError) return res.status(400).json({ message: "Validation failed.", issues: error.issues });
  console.error(error);
  return res.status(500).json({ message: "Internal server error." });
});

export default app;
