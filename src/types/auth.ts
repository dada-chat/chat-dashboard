export interface User {
  id: string;
  email: string;
  name: string;
  role: "AGENT" | "ADMIN" | "MANAGER";
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
