import { UserRole } from "./auth";

export type UserStatus = "PENDING" | "ACTIVE" | "INACTIVED";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash?: string;
  status: UserStatus;
  organizationId: string;
  createdAt: string;
  organization?: {
    name: string;
  };
}

export interface UserResponse {
  success: boolean;
  data: User[];
  message?: string;
}
