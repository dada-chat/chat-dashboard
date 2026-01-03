export type UserRole = "ADMIN" | "MANAGER" | "AGENT";
export interface User {
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
    user: User;
  };
}

export interface RefreshResponse {
  accessToken: string;
}
