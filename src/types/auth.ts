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
