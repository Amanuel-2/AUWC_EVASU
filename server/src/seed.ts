import bcrypt from "bcryptjs";
import { getDb, closeDb } from "./db.js";
import { config } from "./config.js";
import { TeamDocument, UserDocument } from "./types.js";
import { normalizeEmail } from "./utils.js";

const teams = [
  ["love-sharing", "Love Sharing Team", "Extending grace beyond our walls", "We reach out to the campus community with practical acts of kindness."],
  ["art", "Art Team", "Where creativity meets faith", "A creative space for students to use their gifts."],
  ["worship", "Worship Team", "Leading hearts to the throne", "Musicians, singers, and sound technicians serving together."],
  ["choir", "Choir Team", "Lifted voices in harmony", "Singers and vocalists leading worship through choral arrangements."],
  ["media", "Media Team", "Capturing and amplifying the story", "Photography, videography, design, and social media."],
  ["fund", "Fund Team", "Faithful stewardship for shared mission", "Fundraising and financial support for fellowship activities."],
  ["prayer", "Prayer Team", "Interceding for campus and beyond", "Dedicated intercessors praying consistently for campus."],
  ["evangelism", "Evangelism Team", "Every student, every faculty", "Sharing the gospel creatively and courageously."],
] as const;

const leaderAccounts: Record<string, string> = {
  "media@gmail.com": "media",
  "fund@gmail.com": "fund",
  "love@gmail.com": "love-sharing",
  "art@gmail.com": "art",
  "worship@gmail.com": "worship",
  "choir@gmail.com": "choir",
  "pray@gmail.com": "prayer",
  "evangelism@gmail.com": "evangelism",
};

const now = new Date();
const db = await getDb();
const teamCollection = db.collection<TeamDocument>("teams");
const userCollection = db.collection<UserDocument>("users");

// Keep legacy numbered placeholder groups and their memberships intact, but hide them from listings.
await teamCollection.updateMany({ slug: /^small-group-\d+$/ }, { $set: { isPublic: false, updatedAt: now } });

for (const [slug, name, tagline, description] of teams) {
  await teamCollection.updateOne({ slug }, { $set: { isPublic: true, updatedAt: now }, $setOnInsert: { slug, name, tagline, description, color: "#8B5CF6", schedule: [{ day: "To be confirmed", time: "To be confirmed", location: "To be confirmed" }], createdAt: now } }, { upsert: true });
}

if (config.ADMIN_PASSWORD) {
  await userCollection.updateOne({ email: normalizeEmail(config.ADMIN_EMAIL) }, { $set: { name: "AUWC ECSF Admin", email: normalizeEmail(config.ADMIN_EMAIL), passwordHash: await bcrypt.hash(config.ADMIN_PASSWORD, 12), role: "admin", phone: "", avatarUrl: "", updatedAt: now }, $setOnInsert: { createdAt: now } }, { upsert: true });
}

if (config.SEED_LEADER_PASSWORD) {
  for (const [email, slug] of Object.entries(leaderAccounts)) {
    const team = await teamCollection.findOne({ slug });
    if (!team?._id) continue;
    const user = await userCollection.findOneAndUpdate({ email }, { $set: { name: email.split("@")[0], email, passwordHash: await bcrypt.hash(config.SEED_LEADER_PASSWORD, 12), role: "team_leader", phone: "", avatarUrl: "", updatedAt: now }, $setOnInsert: { createdAt: now } }, { upsert: true, returnDocument: "after" });
    if (user?._id) await db.collection("memberships").updateOne({ userId: user._id, teamId: team._id }, { $set: { status: "active", joinedAt: now } }, { upsert: true });
  }
}

console.log("Database seed completed.");
await closeDb();
