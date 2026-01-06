import { UserRole } from "./auth";

export interface Invitation {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isAccepted: boolean;
  invitedById: string;
  organizationId: string;
  createdAt: string;
  invitedBy?: {
    name: string;
    email: string;
  };
  organization?: {
    name: string;
  };
}

export interface InvitationResponse {
  success: boolean;
  data: Invitation[];
  message?: string;
}

export interface CreateInvitation {
  email: string;
  name: string;
  role: UserRole;
  organizationId?: string;
}

export interface SingleInvitationResponse {
  success: boolean;
  data: Invitation | null;
  message?: string;
}

export interface GetInvitationsParams {
  status?: "pending" | "accepted";
  organizationId?: string;
}
