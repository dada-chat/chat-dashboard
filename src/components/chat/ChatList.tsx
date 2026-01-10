"use client";

import { getChattingList } from "@/lib/chatting";
import { ChatListItem } from "./ChatListItem";
import { ChattingListItem } from "@/types/chatting";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ChatList({
  refreshTrigger,
}: {
  refreshTrigger?: number;
}) {
  const [ChattingList, setChattingList] = useState<ChattingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const selectedId = params?.roomId as string;

  const fetchChattingList = async () => {
    try {
      setIsLoading(true);
      const response = await getChattingList();
      if (response.success) {
        setChattingList(response.data);
      }
    } catch (error) {
      console.error("채팅 목록 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("🔄 refreshTrigger 변경됨! 목록을 새로고침합니다.");
    fetchChattingList();
  }, [refreshTrigger]);

  const handleRoomClick = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-300 rounded-lg">
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-sm font-semibold text-gray-600">채팅방 목록</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {ChattingList.map((item) => (
          <ChatListItem
            key={item.id}
            data={item}
            isSelected={selectedId === item.id}
            onClick={() => handleRoomClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
