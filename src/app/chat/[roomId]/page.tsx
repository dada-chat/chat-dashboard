"use client";

import ChatWindow from "@/components/chat/ChatWindow";
import ChatMembersInfo from "@/components/chat/ChatMembersInfo";
import { useState, useEffect } from "react";
import { getChattingRoom, updateChattingRoomAsRead } from "@/lib/chatting";
import { useParams } from "next/navigation";
import { ChattingRoom } from "@/types/chatting";

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = params?.roomId as string;
  const [chattingRoom, setChattingRoom] = useState<ChattingRoom | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChattingRoom = async () => {
    try {
      const response = await getChattingRoom(roomId);
      if (response.success) {
        setChattingRoom(response.data);
      }
      await updateChattingRoomAsRead(roomId);
    } catch (error) {
      console.error("채팅방 조회 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!roomId) return;

    fetchChattingRoom();
  }, [roomId]);

  return (
    <>
      <div className="flex-1 flex flex-col">
        <ChatWindow
          roomId={roomId}
          messages={chattingRoom?.messages ?? []}
          chattingRoomStatus={chattingRoom?.status ?? "OPEN"}
          onMessageSent={fetchChattingRoom}
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
