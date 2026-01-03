import api from "./axios";
import { DomainResponse, SingleDomainResponse, Domain } from "@/types/domain";

export const getDomains = async (): Promise<DomainResponse> => {
  try {
    const response = await api.get<DomainResponse>("/domains");
    return response.data; // domain 배열만 반환
  } catch (error) {
    console.error("소속 도메인 조회(getDomains) error:", error);
    return {
      success: false,
      data: [],
    };
  }
};

export const updateDomainStatus = async (
  id: string,
  isActive: boolean
): Promise<SingleDomainResponse> => {
  try {
    const response = await api.patch<SingleDomainResponse>(`/domains/${id}`, {
      isActive,
    });
    return response.data;
  } catch (error) {
    console.error("도메인 상태 변경(updateDomainStatus) error:", error);
    return {
      success: false,
      message: "상태 변경 중 오류가 발생했습니다.",
      data: {} as Domain,
    };
  }
};
