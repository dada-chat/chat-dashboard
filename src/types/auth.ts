export type UserRole = "ADMIN" | "MANAGER" | "AGENT";
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
}

export interface SignInResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: AuthUser;
  };
}

export interface RefreshResponse {
  accessToken: string;
}

export interface CreateUserAsAgent {
  email: string;
  password: string;
  name: string;
  organizationName: string;
}

export interface CreateUserByInvitation {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  organizationId: string;
  organizationName: string;
  invitationId: string;
}

export interface CreatedUser {
  userId: string;
  organizationId: string;
  email?: string;
}

export interface SignUpResponse {
  success: boolean;
  data: CreatedUser | null;
  message?: string;
}
