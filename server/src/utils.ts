import { ObjectId } from "mongodb";
import { UserDocument } from "./types.js";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function publicUser(user: UserDocument) {
  return {
    id: user._id?.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    yearOfStudy: user.yearOfStudy ?? "",
    gender: user.gender ?? "",
    avatarUrl: user.avatarUrl,
  };
}

export function id(value: string) {
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}

export function serialize(value: unknown): unknown {
  if (value instanceof ObjectId) return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, serialize(item)]));
  return value;
}
