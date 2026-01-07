export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  _count?: {
    users: number;
    domains: number;
  };
}

export interface CreateOrganization {
  name: string;
}

export interface OrganizationResponse {
  success: boolean;
  data: Organization[];
  message?: string;
}

export interface SingleOrganizationResponse {
  success: boolean;
  data: Organization | null;
  message?: string;
}
