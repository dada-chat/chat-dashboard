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

export interface UserBasePayload {
  name: string;
  role: UserRole;
  status: UserStatus;
  organizationId?: string;
}

export interface CreateUserPayload extends UserBasePayload {
  email: string;
  password: string;
}

export interface SingleUserResponse {
  success: boolean;
  data: User;
  message?: string;
}
