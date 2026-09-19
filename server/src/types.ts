import { ObjectId } from "mongodb";

export type Role = "admin" | "team_leader" | "member";
export type AttendanceStatus = "Present" | "Absent" | "Late" | "Excused";

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  phone: string;
  yearOfStudy?: string;
  gender?: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamDocument {
  _id?: ObjectId;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  isPublic: boolean;
  color: string;
  schedule: { day: string; time: string; location: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MembershipDocument {
  _id?: ObjectId;
  userId: ObjectId;
  teamId: ObjectId;
  status: "active" | "inactive";
  joinedAt: Date;
}

export interface AttendanceDocument {
  _id?: ObjectId;
  teamId: ObjectId;
  meetingDate: string;
  markedBy: ObjectId;
  markedAt: Date;
  statuses: Record<string, AttendanceStatus>;
}

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  teamIds: string[];
}
