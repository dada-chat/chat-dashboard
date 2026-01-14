"use client";
import { flushSync } from "react-dom";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatMembersInfo from "@/components/chat/ChatMembersInfo";
import { useState, useEffect, useRef } from "react";
import { getChattingRoom, updateChattingRoomAsRead } from "@/lib/chatting";
import { useParams } from "next/navigation";
import { ChattingRoom, Message } from "@/types/chatting";
import { useChatStore } from "@/store/chatStore";

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = params?.roomId as string;
  const [chattingRoom, setChattingRoom] = useState<ChattingRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    messages,
    cursor,
    hasMore,
    isLoadingPrev,
    setInitialData,
    prependMessages,
    setIsLoadingPrev,
    reset,
  } = useChatStore();

  const fetchChattingRoom = async () => {
    reset();
    try {
      const response = await getChattingRoom(roomId);
      if (response.success && response.data) {
        setChattingRoom(response.data);
        setInitialData({
          messages: response.data.messages,
          nextCursor: response.data.nextCursor,
          hasMore: response.data.hasMore,
          status: response.data.status,
        });
      }

      await updateChattingRoomAsRead(roomId);
    } catch (error) {
      console.error("채팅방 조회 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop < 80 && hasMore && !isLoadingPrev) {
      const prevHeight = target.scrollHeight;

      const result = await getChattingRoom(roomId!, cursor ?? undefined);

      if (result.success && result.data) {
        // flushSync, 상태 업데이트 후 DOM에 반영될 때까지 기다립니다.
        // (DOM, 즉시 업데이트되는 것을 보장한다)
        flushSync(() => {
          prependMessages({
            messages: result.data?.messages ?? [],
            nextCursor: result.data?.nextCursor ?? null,
            hasMore: result.data?.hasMore ?? true,
          });
        });

        // if (chatWindowRef.current) {
        //   const newScrollHeight = chatWindowRef.current.scrollHeight;
        //   const scrollDifference = newScrollHeight - prevScrollHeight;

        //   // 브라우저의 자동 스크롤 보정을 막고 직접 위치 설정
        //   chatWindowRef.current.scrollTop = scrollDifference + target.scrollTop;
        // }
        // 스크롤 위치 보정
        target.scrollTop = target.scrollHeight - prevHeight;
      }

      setIsLoadingPrev(false);
    }
  };

  useEffect(() => {
    if (!roomId) return;

    fetchChattingRoom();

    return () => reset(); // 페이지 벗어날 때 초기화
  }, [roomId]);

  return (
    <>
      <div className="flex-1 flex flex-col">
        <ChatWindow
          roomId={roomId}
          onScroll={handleScroll}
          chatWindowRef={chatWindowRef}
          onMetadata={setChattingRoom}
        />
      </div>
      <div className="w-[320px] bg-white">
        <ChatMembersInfo
          roomId={roomId}
          firstMessageAt={chattingRoom?.firstMessageAt ?? null}
          visitor={chattingRoom?.visitor ?? null}
          domain={chattingRoom?.domain ?? null}
          assignedUser={chattingRoom?.assignedUser ?? null}
        />
      </div>
    </>
  );
}
