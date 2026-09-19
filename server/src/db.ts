import { MongoClient, Db, ObjectId } from "mongodb";
import { config } from "./config.js";
import { TeamDocument } from "./types.js";

let client: MongoClient | undefined;
let database: Db | undefined;

export async function getDb() {
  if (database) return database;
  client = new MongoClient(config.MONGODB_URI);
  await client.connect();
  database = client.db(config.MONGODB_DB);
  await ensureIndexes(database);
  return database;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("teams").createIndex({ slug: 1 }, { unique: true }),
    db.collection("memberships").createIndex({ userId: 1, teamId: 1 }, { unique: true }),
    db.collection("attendance").createIndex({ teamId: 1, meetingDate: 1 }, { unique: true }),
  ]);
}

export function toObjectId(value: string) {
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}

export async function findTeamBySlug(slug: string) {
  const db = await getDb();
  return db.collection<TeamDocument>("teams").findOne({ slug });
}

export async function closeDb() {
  await client?.close();
  client = undefined;
  database = undefined;
}
