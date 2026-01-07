import api, { isAxiosError } from "./axios";
import {
  InvitationResponse,
  CreateInvitation,
  SingleInvitationResponse,
  GetInvitationsParams,
} from "@/types/invitation";

// 특정 조직에 대한 초대 목록 조회,
// ADMIN, 전체 초대 조회
export const getInvitations = async (
  params?: GetInvitationsParams
): Promise<InvitationResponse> => {
  try {
    const response = await api.get<InvitationResponse>("/invitations", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("초대 목록 조회(getInvitations) error:", error);
    return {
      success: false,
      data: [],
      message: "초대 목록을 불러오는 중 오류가 발생했습니다.",
    };
  }
};

export const createInvitation = async (
  data: CreateInvitation
): Promise<SingleInvitationResponse> => {
  try {
    const response = await api.post<SingleInvitationResponse>(
      "/invitations",
      data
    );
    return response.data;
  } catch (error) {
    console.error("초대 생성(createInvitation) error:", error);
    return {
      success: false,
      message: "초대하는 과정에서 오류가 발생했습니다.",
      data: null,
    };
  }
};

export const getInvitationById = async (
  invitationId: string
): Promise<SingleInvitationResponse> => {
  try {
    const response = await api.get<SingleInvitationResponse>(
      `/invitations/${invitationId}`
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message: serverMessage || "유효하지 않은 초대 링크입니다.",
      };
    }
    return {
      success: false,
      data: null,
      message: "시스템 오류가 발생했습니다.",
    };
  }
};
