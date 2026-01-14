import api, { isAxiosError } from "./axios";
import {
  ChattingListResponse,
  ChattingRoomResponse,
  ChattingCommonResultResponse,
  ChattingRoomStatus,
  MessageResponse,
} from "@/types/chatting";

// 특정 조직에 대한 채팅 목록 조회
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

export const getChattingRoom = async (
  conversationId: string,
  cursor?: Date,
  limit: number = 20
): Promise<ChattingRoomResponse> => {
  try {
    const response = await api.get<ChattingRoomResponse>(
      `/chat/conversations/${conversationId}`,
      {
        params: {
          ...(cursor && { cursor }),
          limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("채팅방 메세지 조회(getChattingRoom) error:", error);
    return {
      success: false,
      data: null,
      message: "채팅방에 대한 정보를 불러오는 중 오류가 발생했습니다.",
    };
  }
};

export const updateChattingRoomAsRead = async (
  conversationId: string
): Promise<ChattingCommonResultResponse> => {
  try {
    const response = await api.post<ChattingCommonResultResponse>(
      `/chat/conversations/${conversationId}/read`
    );
    return response.data;
  } catch (error) {
    console.error(
      "채팅방 메세지 읽음(updateChattingRoomAsRead) 처리 error:",
      error
    );
    return {
      success: false,
      message: "채팅방 메세지 읽음 처리 과정에서 오류가 발생했습니다.",
    };
  }
};

export const sendNewMessage = async (data: {
  conversationId: string;
  content: string;
}) => {
  try {
    const response = await api.post<MessageResponse>(`/chat/messages`, data);
    return response.data;
  } catch (error) {
    console.error("새로운 메세지 전송(sendNewMessage) 처리 error:", error);
    return {
      success: false,
      data: null,
      message: "새로운 메세지 전송 과정에서 오류가 발생했습니다.",
    };
  }
};

export const updateChattingRoomStatus = async (
  conversationId: string,
  status: ChattingRoomStatus
) => {
  try {
    const response = await api.patch<MessageResponse>(
      `/chat/conversations/${conversationId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error(
      "채팅방 상태 변경(updateChattingRoomStatus) 처리 error:",
      error
    );
    return {
      success: false,
      data: null,
      message: "채팅방 상태 변경 과정에서 오류가 발생했습니다.",
    };
  }
};
