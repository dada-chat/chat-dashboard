export interface Domain {
  id: string;
  domainUrl: string;
  siteKey: string;
  isActive: boolean;
  organizationId: string;
  createdAt: string;
}

export interface CreateDomain {
  domainUrl: string;
  targetOrgId: string;
}

export interface DomainResponse {
  success: boolean;
  data: Domain[];
  message?: string;
}

export interface SingleDomainResponse {
  success: boolean;
  data: Domain;
  message?: string;
}
