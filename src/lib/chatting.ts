import api, { isAxiosError } from "./axios";
import { ChattingListResponse } from "@/types/chatting";

// 특정 조직에 대한 채팅 목록 조회,
// ADMIN, 전체 초대 조회
export const getChattingList = async (): Promise<ChattingListResponse> => {
  try {
    const response = await api.get<ChattingListResponse>("/chat/conversations");
    return response.data;
  } catch (error) {
    console.error("채팅 목록 조회(getChattingList) error:", error);
    return {
      success: false,
      data: [],
      message: "채팅 목록을 불러오는 중 오류가 발생했습니다.",
    };
  }
};
