import api from "./axios";
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
