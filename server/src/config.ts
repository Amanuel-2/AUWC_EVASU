import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  MONGODB_URI: z.string().min(1),
  MONGODB_DB: z.string().min(1).default("auwcec_ecsf"),
  JWT_SECRET: z.string().min(32),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  ADMIN_EMAIL: z.string().email().default("admin@auwcec.edu"),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  SEED_LEADER_PASSWORD: z.string().min(8).optional(),
});

export const config = envSchema.parse(process.env);
