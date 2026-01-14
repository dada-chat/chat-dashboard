import { create } from "zustand";
import { Message, ChattingRoomStatus } from "@/types/chatting";
import { getChattingRoom } from "@/lib/chatting";

interface ChatState {
  messages: Message[];
  cursor: Date | null;
  hasMore: boolean;
  isLoadingPrev: boolean;
  status: ChattingRoomStatus;
  refreshTrigger: number;

  // 초기 데이터 설정 (방 진입 시)
  setInitialData: (data: {
    messages: Message[];
    nextCursor: Date | null;
    hasMore: boolean;
    status: ChattingRoomStatus;
  }) => void;

  // 이전 메시지 추가
  prependMessages: (data: {
    messages: Message[];
    nextCursor: Date | null;
    hasMore: boolean;
  }) => void;

  // 새 메시지 추가
  addMessage: (message: Message) => void;

  // 로딩 상태 제어
  setIsLoadingPrev: (loading: boolean) => void;

  setStatus: (status: ChattingRoomStatus) => void;

  // 채팅 목록 호출 트리거
  triggerRefresh: () => void;

  // 스토어 초기화 (방 퇴장 시)
  reset: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  cursor: null,
  hasMore: true,
  isLoadingPrev: false,
  status: "OPEN",
  refreshTrigger: 0,

  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),

  setInitialData: (data) =>
    set({
      messages: data.messages,
      cursor: data.nextCursor,
      hasMore: data.hasMore,
      status: data.status,
    }),

  prependMessages: (data) =>
    set((state) => {
      // 1. 기존 메시지 ID들을 Set으로 저장 (검색 속도 최적화)
      const existingIds = new Set(state.messages.map((m) => m.id));

      // 2. 새로 받아온 메시지 중 기존에 없는 것만 필터링
      const filteredNewMessages = data.messages.filter(
        (m) => !existingIds.has(m.id)
      );

      // 3. 만약 추가할 메시지가 없다면 상태 유지
      if (filteredNewMessages.length === 0) {
        return {
          cursor: data.nextCursor,
          hasMore: data.hasMore,
        };
      }

      return {
        // 새 메시지(과거) + 기존 메시지(현재)
        messages: [...filteredNewMessages, ...state.messages],
        cursor: data.nextCursor,
        hasMore: data.hasMore,
      };
    }),

  addMessage: (message) =>
    set((state) => {
      // 중복 메시지 방지 (이미 존재하는 ID면 무시)
      if (state.messages.some((m) => m.id === message.id)) return state;

      return {
        messages: [...state.messages, message],
      };
    }),

  setIsLoadingPrev: (loading) => set({ isLoadingPrev: loading }),

  setStatus: (status) => set({ status }),

  reset: () =>
    set({
      messages: [],
      cursor: null,
      hasMore: true,
      isLoadingPrev: false,
      status: "OPEN",
    }),
}));
