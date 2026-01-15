import api, { isAxiosError } from "./axios";
import {
  OrganizationResponse,
  SingleOrganizationResponse,
} from "@/types/organization";

// ADMIN, 전체 조직 목록 조회
export const getOrganizations = async (): Promise<OrganizationResponse> => {
  try {
    const response = await api.get<OrganizationResponse>("/organizations");
    return response.data;
  } catch (error) {
    console.error("조직 목록 조회(getOrganizations) error:", error);
    return {
      success: false,
      data: [],
      message: "조직 목록을 불러오는 중 오류가 발생했습니다.",
    };
  }
};

export const getOrganizationById = async (
  organizationId: string
): Promise<SingleOrganizationResponse> => {
  try {
    const response = await api.get<SingleOrganizationResponse>(
      `/organizations/${organizationId}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message: serverMessage || "유효하지 않은 경로입니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};

export const createOrganization = async (data: {
  name: string;
}): Promise<SingleOrganizationResponse> => {
  try {
    const response = await api.post<SingleOrganizationResponse>(
      "/organizations",
      data
    );
    return response.data;
  } catch (error) {
    console.error("회사 등록(createOrganization) error:", error);
    return {
      success: false,
      data: null,
      message: "회사 등록 중 오류가 발생했습니다.",
    };
  }
};
