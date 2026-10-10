import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { findTeamBySlug, getDb } from "./db.js";
import { config } from "./config.js";
import { requireAuth, requireMediaTeamAccess, requireRole, requireTeamAccess, signAccessToken } from "./auth.js";
import { AttendanceDocument, MembershipDocument, PasswordResetTokenDocument, TeamDocument, TikTokVideoDocument, UserDocument } from "./types.js";
import { id, normalizeEmail, publicUser, serialize } from "./utils.js";
import crypto from "node:crypto";

const app = express();
app.use(cors({ origin: config.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));

const frontendDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../dist");
app.use("/assets", express.static(path.join(frontendDist, "assets"), { maxAge: "1y", immutable: true }));
app.use(express.static(frontendDist, { maxAge: "1h" }));

const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
const resetRequestSchema = z.object({ email: z.string().trim().email() });
const resetPasswordSchema = z.object({ token: z.string().regex(/^[a-f0-9]{64}$/), password: z.string().min(8).max(128) });
const registerSchema = z.object({ name: z.string().trim().min(2), email: z.string().email(), password: z.string().min(1), phone: z.string().trim().max(40).optional().default(""), department: z.string().trim().min(2).max(100), yearOfStudy: z.string().trim().max(40).optional().default(""), gender: z.string().trim().max(40).optional().default("") });
const scheduleSchema = z.object({ day: z.string().trim().min(1), time: z.string().trim().min(1), location: z.string().trim().min(1) });
const attendanceSchema = z.object({ meetingDate: z.string().date(), statuses: z.record(z.enum(["Present", "Absent", "Late", "Excused"])) });
const tiktokVideoSchema = z.object({ url: z.string().url().max(500), title: z.string().trim().max(120).default(""), description: z.string().trim().max(500).default(""), isActive: z.boolean().default(true) });
const tiktokVideoPatchSchema = tiktokVideoSchema.partial();
const tiktokReorderSchema = z.object({ ids: z.array(z.string()).max(500) });
const teamSchema = z.object({ slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), name: z.string().trim().min(2), tagline: z.string().trim().min(2), description: z.string().trim().min(2), isPublic: z.boolean().default(true), color: z.string().trim().default("#8B5CF6"), schedule: z.array(scheduleSchema).default([]) });
const namedTeamFilter = { slug: { $not: /^small-group-\d+$/ } };

const resetRequestWindow = new Map<string, number[]>();
const resetAttemptWindow = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;
const MAX_ATTEMPTS = 10;

function allowedRequest(map: Map<string, number[]>, key: string, max: number) {
  const now = Date.now();
  const recent = (map.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= max) { map.set(key, recent); return false; }
  recent.push(now); map.set(key, recent); return true;
}

function hashResetToken(token: string) { return crypto.createHash("sha256").update(token).digest("hex"); }

async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!config.RESEND_API_KEY) throw new Error("Password reset email delivery is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.EMAIL_FROM,
      to: [email],
      subject: "Reset your AUWC ECSF password",
      text: `We received a request to reset your AUWC ECSF password. This link expires in 30 minutes:\n\n${resetUrl}\n\nIf you did not request this, you can safely ignore this email.`,
      html: `<p>We received a request to reset your AUWC ECSF password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 30 minutes. If you did not request this, you can safely ignore this email.</p>`,
    }),
  });
  if (!response.ok) throw new Error("Password reset email delivery failed.");
}

function getVideoDetails(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:") return null;
    const hostname = parsed.hostname.toLowerCase();
    if (["tiktok.com", "www.tiktok.com", "m.tiktok.com", "vm.tiktok.com"].includes(hostname)) {
      const videoId = parsed.pathname.match(/\/video\/(\d+)/)?.[1];
      return videoId ? { videoId, platform: "TikTok" as const, embedUrl: `https://www.tiktok.com/player/v1/${videoId}?description=1&music_info=1` } : null;
    }
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(hostname)) {
      const videoId = hostname === "youtu.be" ? parsed.pathname.slice(1).split("/")[0] : parsed.searchParams.get("v") ?? parsed.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)?.[1];
      return videoId ? { videoId, platform: "YouTube" as const, embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0` } : null;
    }
    if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(hostname)) {
      const videoId = parsed.pathname.match(/\/(\d+)(?:\/|$)/)?.[1];
      return videoId ? { videoId, platform: "Vimeo" as const, embedUrl: `https://player.vimeo.com/video/${videoId}` } : null;
    }
    if (["instagram.com", "www.instagram.com"].includes(hostname)) {
      const match = parsed.pathname.match(/\/(reel|p|tv)\/([^/?]+)/);
      return match ? { videoId: match[2], platform: "Instagram" as const, embedUrl: `https://www.instagram.com/${match[1]}/${match[2]}/embed` } : null;
    }
    if (["facebook.com", "www.facebook.com", "m.facebook.com", "fb.watch"].includes(hostname)) {
      const videoId = parsed.searchParams.get("v") ?? parsed.pathname.match(/\/(?:videos|reel)\/(\d+)/)?.[1] ?? parsed.pathname.slice(1).split("/")[0];
      return videoId ? { videoId, platform: "Facebook" as const, embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(rawUrl)}&show_text=false` } : null;
    }
    // Unknown HTTPS platforms can still be published as an external link.
    return { videoId: rawUrl, platform: "External" as const, embedUrl: null };
  } catch {
    return null;
  }
}

function publicTikTokVideo(video: TikTokVideoDocument) {
  const platform = video.platform ?? "TikTok";
  return {
    id: video._id?.toString(),
    url: video.url,
    videoId: video.videoId,
    embedUrl: video.embedUrl ?? (platform === "External" ? null : platform === "TikTok" ? `https://www.tiktok.com/player/v1/${video.videoId}?description=1&music_info=1` : platform === "YouTube" ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.videoId)}?rel=0` : platform === "Vimeo" ? `https://player.vimeo.com/video/${video.videoId}` : platform === "Instagram" ? `https://www.instagram.com/p/${video.videoId}/embed` : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url)}&show_text=false`),
    platform,
    title: video.title,
    description: video.description,
    isActive: video.isActive,
    order: video.order,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt,
  };
}

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/tiktok-videos", async (_req, res, next) => {
  try {
    const db = await getDb();
    const videos = await db.collection<TikTokVideoDocument>("tiktokVideos").find({ isActive: true }).sort({ order: 1, createdAt: 1 }).toArray();
    return res.json(videos.map(publicTikTokVideo));
  } catch (error) { return next(error); }
});

app.get("/api/media/tiktok-videos", requireAuth, requireMediaTeamAccess, async (_req, res, next) => {
  try {
    const db = await getDb();
    const videos = await db.collection<TikTokVideoDocument>("tiktokVideos").find({}).sort({ order: 1, createdAt: 1 }).toArray();
    return res.json(videos.map(publicTikTokVideo));
  } catch (error) { return next(error); }
});

app.post("/api/media/tiktok-videos", requireAuth, requireMediaTeamAccess, async (req, res, next) => {
  try {
    const input = tiktokVideoSchema.parse(req.body);
    const details = getVideoDetails(input.url);
    if (!details) return res.status(400).json({ message: "Use a valid public HTTPS video URL from a supported platform." });
    const db = await getDb();
    const existing = await db.collection<TikTokVideoDocument>("tiktokVideos").findOne({ url: input.url });
    if (existing) return res.status(409).json({ message: "This TikTok video is already in the gallery." });
    await db.collection<TikTokVideoDocument>("tiktokVideos").updateMany({}, { $inc: { order: 1 } });
    const now = new Date();
    const video: TikTokVideoDocument = { ...input, ...details, order: 0, createdBy: id(req.authUser!.id)!, createdAt: now, updatedAt: now };
    const result = await db.collection<TikTokVideoDocument>("tiktokVideos").insertOne(video);
    video._id = result.insertedId;
    return res.status(201).json(publicTikTokVideo(video));
  } catch (error) { return next(error); }
});

app.patch("/api/media/tiktok-videos/reorder", requireAuth, requireMediaTeamAccess, async (req, res, next) => {
  try {
    const { ids } = tiktokReorderSchema.parse(req.body);
    const objectIds = ids.map((value) => id(value));
    if (objectIds.some((value) => !value) || new Set(ids).size !== ids.length) return res.status(400).json({ message: "The reorder list contains invalid or duplicate video IDs." });
    const db = await getDb();
    const videos = await db.collection<TikTokVideoDocument>("tiktokVideos").find({}).toArray();
    if (videos.length !== ids.length || videos.some((video) => !ids.includes(video._id!.toString()))) return res.status(400).json({ message: "Reorder must include every gallery video exactly once." });
    await Promise.all(ids.map((videoId, order) => db.collection<TikTokVideoDocument>("tiktokVideos").updateOne({ _id: id(videoId)! }, { $set: { order, updatedAt: new Date() } })));
    const updated = await db.collection<TikTokVideoDocument>("tiktokVideos").find({}).sort({ order: 1 }).toArray();
    return res.json(updated.map(publicTikTokVideo));
  } catch (error) { return next(error); }
});

app.patch("/api/media/tiktok-videos/:videoId", requireAuth, requireMediaTeamAccess, async (req, res, next) => {
  try {
    const videoObjectId = id(String(req.params.videoId));
    if (!videoObjectId) return res.status(400).json({ message: "Invalid video ID." });
    const input = tiktokVideoPatchSchema.parse(req.body);
    const update: Partial<TikTokVideoDocument> = { ...input, updatedAt: new Date() };
    if (input.url) {
      const details = getVideoDetails(input.url);
      if (!details) return res.status(400).json({ message: "Use a valid public HTTPS video URL from a supported platform." });
      const duplicate = await (await getDb()).collection<TikTokVideoDocument>("tiktokVideos").findOne({ url: input.url, _id: { $ne: videoObjectId } });
      if (duplicate) return res.status(409).json({ message: "This TikTok video is already in the gallery." });
      Object.assign(update, details);
    }
    const db = await getDb();
    const result = await db.collection<TikTokVideoDocument>("tiktokVideos").findOneAndUpdate({ _id: videoObjectId }, { $set: update }, { returnDocument: "after" });
    if (!result) return res.status(404).json({ message: "TikTok video not found." });
    return res.json(publicTikTokVideo(result));
  } catch (error) { return next(error); }
});

app.delete("/api/media/tiktok-videos/:videoId", requireAuth, requireMediaTeamAccess, async (req, res, next) => {
  try {
    const videoObjectId = id(String(req.params.videoId));
    if (!videoObjectId) return res.status(400).json({ message: "Invalid video ID." });
    const db = await getDb();
    const result = await db.collection<TikTokVideoDocument>("tiktokVideos").deleteOne({ _id: videoObjectId });
    if (!result.deletedCount) return res.status(404).json({ message: "TikTok video not found." });
    return res.status(204).send();
  } catch (error) { return next(error); }
});

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body);
    const db = await getDb();
    const email = normalizeEmail(input.email);
    const exists = await db.collection<UserDocument>("users").findOne({ email });
    if (exists) return res.status(409).json({ message: "An account with this email already exists." });
    const now = new Date();
    const user: UserDocument = { name: input.name, email, passwordHash: await bcrypt.hash(input.password, 12), role: "member", phone: input.phone, department: input.department, yearOfStudy: input.yearOfStudy, gender: input.gender, avatarUrl: "", createdAt: now, updatedAt: now };
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

app.post("/api/auth/forgot-password", async (req, res, next) => {
  const generic = { message: "If an account exists for that email, a password reset link has been sent." };
  try {
    const input = resetRequestSchema.parse(req.body);
    const requestKey = `${req.ip}:${normalizeEmail(input.email)}`;
    if (!allowedRequest(resetRequestWindow, requestKey, MAX_REQUESTS)) return res.json(generic);
    const db = await getDb();
    const user = await db.collection<UserDocument>("users").findOne({ email: normalizeEmail(input.email) });
    if (!user?._id) return res.json(generic);
    const token = crypto.randomBytes(32).toString("hex");
    const now = new Date();
    await db.collection<PasswordResetTokenDocument>("passwordResetTokens").deleteMany({ userId: user._id });
    await db.collection<PasswordResetTokenDocument>("passwordResetTokens").insertOne({ userId: user._id, tokenHash: hashResetToken(token), createdAt: now, expiresAt: new Date(now.getTime() + 30 * 60 * 1000) });
    try {
      await sendPasswordResetEmail(user.email, `${config.FRONTEND_URL}/reset-password?token=${token}`);
    } catch (error) {
      console.error("Password reset email delivery failed:", error instanceof Error ? error.message : "Unknown delivery error");
      await db.collection<PasswordResetTokenDocument>("passwordResetTokens").deleteOne({ tokenHash: hashResetToken(token) });
    }
    return res.json(generic);
  } catch (error) { return next(error); }
});

app.post("/api/auth/reset-password", async (req, res, next) => {
  try {
    const input = resetPasswordSchema.parse(req.body);
    if (!allowedRequest(resetAttemptWindow, `${req.ip}:${input.token.slice(0, 12)}`, MAX_ATTEMPTS)) return res.status(429).json({ message: "Too many attempts. Please request a new reset link." });
    const db = await getDb();
    const tokenHash = hashResetToken(input.token);
    const token = await db.collection<PasswordResetTokenDocument>("passwordResetTokens").findOneAndUpdate({ tokenHash, expiresAt: { $gt: new Date() }, usedAt: { $exists: false } }, { $set: { usedAt: new Date() } }, { returnDocument: "before" });
    if (!token?.userId) return res.status(400).json({ message: "This reset link is invalid or has expired. Request a new one." });
    const passwordChangedAt = new Date();
    const result = await db.collection<UserDocument>("users").updateOne({ _id: token.userId }, { $set: { passwordHash: await bcrypt.hash(input.password, 12), passwordChangedAt, updatedAt: passwordChangedAt } });
    if (!result.modifiedCount) return res.status(400).json({ message: "This reset link is invalid or has expired. Request a new one." });
    await db.collection<PasswordResetTokenDocument>("passwordResetTokens").deleteMany({ userId: token.userId });
    return res.json({ message: "Your password has been changed. You can now sign in." });
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
    const teams = await db.collection<TeamDocument>("teams").find({ _id: { $in: memberships.map((membership) => membership.teamId) }, ...namedTeamFilter }).toArray();
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
    return res.json(serialize(await db.collection<TeamDocument>("teams").find(namedTeamFilter).sort({ name: 1 }).toArray()));
  } catch (error) { return next(error); }
});

app.get("/api/admin/overview", requireAuth, requireRole("admin"), async (_req, res, next) => {
  try {
    const db = await getDb();
    const [users, teams, memberships] = await Promise.all([
      db.collection<UserDocument>("users").find({}, { projection: { passwordHash: 0 } }).sort({ name: 1 }).toArray(),
      db.collection<TeamDocument>("teams").find(namedTeamFilter).sort({ name: 1 }).toArray(),
      db.collection<MembershipDocument>("memberships").find({ status: "active" }).toArray(),
    ]);
    const memberIdsByTeam = new Map<string, string[]>();
    for (const membership of memberships) {
      const teamId = membership.teamId.toString();
      const memberIds = memberIdsByTeam.get(teamId) ?? [];
      memberIds.push(membership.userId.toString());
      memberIdsByTeam.set(teamId, memberIds);
    }
    return res.json(serialize({ users: users.map(publicUser), teams: teams.map((team) => ({ ...team, memberIds: memberIdsByTeam.get(team._id?.toString() ?? "") ?? [] })) }));
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
    const input = z.object({ userIds: z.array(z.string()).min(1).max(3) }).parse(req.body);
    const db = await getDb();
    const team = await findTeamBySlug(String(req.params.teamId));
    if (!team?._id) return res.status(404).json({ message: "Team not found." });
    const userIds = [...new Set(input.userIds)].map((value) => id(value)).filter((value): value is NonNullable<typeof value> => Boolean(value));
    if (userIds.length !== input.userIds.length) return res.status(400).json({ message: "One or more selected users are invalid." });
    const users = await db.collection<UserDocument>("users").find({ _id: { $in: userIds } }).toArray();
    if (users.length !== userIds.length) return res.status(404).json({ message: "One or more selected users were not found." });
    if (users.some((user) => user.role === "admin")) return res.status(400).json({ message: "An admin cannot be assigned as a team leader." });
    for (const user of users) {
      await db.collection<UserDocument>("users").updateOne({ _id: user._id }, { $set: { role: "team_leader", updatedAt: new Date() } });
      await db.collection<MembershipDocument>("memberships").updateOne({ userId: user._id, teamId: team._id }, { $set: { status: "active", joinedAt: new Date() } }, { upsert: true });
    }
    return res.json({ message: `${users.length} team leader${users.length === 1 ? "" : "s"} assigned successfully.` });
  } catch (error) { return next(error); }
});

app.post("/api/admin/leaders/password", requireAuth, requireRole("admin"), async (req, res, next) => {
  try {
    const input = z.object({ userIds: z.array(z.string()).min(1).max(3), password: z.string().min(8).max(128) }).parse(req.body);
    const db = await getDb();
    const userIds = [...new Set(input.userIds)].map((value) => id(value)).filter((value): value is NonNullable<typeof value> => Boolean(value));
    if (userIds.length !== input.userIds.length) return res.status(400).json({ message: "One or more selected users are invalid." });
    const leaders = await db.collection<UserDocument>("users").find({ _id: { $in: userIds }, role: "team_leader" }).toArray();
    if (leaders.length !== userIds.length) return res.status(400).json({ message: "Only team leader accounts can be updated here." });
    const passwordHash = await bcrypt.hash(input.password, 12);
    await db.collection<UserDocument>("users").updateMany({ _id: { $in: userIds } }, { $set: { passwordHash, updatedAt: new Date() } });
    return res.json({ message: `Password updated for ${leaders.length} team leader${leaders.length === 1 ? "" : "s"}.` });
  } catch (error) { return next(error); }
});

app.get("/api/teams", async (req, res, next) => {
  try {
    const db = await getDb();
    const filter = req.authUser?.role === "admin" ? namedTeamFilter : { ...namedTeamFilter, isPublic: true };
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

// Serve the Vite SPA for browser routes when frontend and backend share a host.
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  return res.sendFile(path.join(frontendDist, "index.html"));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof z.ZodError) return res.status(400).json({ message: "Validation failed.", issues: error.issues });
  console.error(error);
  return res.status(500).json({ message: "Internal server error." });
});

export default app;
