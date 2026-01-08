"use client";

import clsx from "clsx";
import { ChatListItem } from "./ChatListItem";

interface ChatListProps {
  selectedId: string | null;
  onRoomSelect: (id: string) => void;
}

export default function ChatList({ selectedId, onRoomSelect }: ChatListProps) {
  const dummyRooms = [
    {
      id: "1",
      name: "김철수",
      lastMsg: "결제 오류가 발생했어요.",
      time: "14:20",
      status: "ongoing",
    },
    {
      id: "2",
      name: "이영희",
      lastMsg: "감사합니다!",
      time: "13:05",
      status: "ongoing",
    },
    {
      id: "3",
      name: "박지성",
      lastMsg: "도메인 연결은 어떻게 하나요?",
      time: "12:50",
      status: "waiting",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white border border-gray-300 rounded-lg">
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-sm font-semibold text-gray-600">채팅방 목록</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {dummyRooms.map((room) => (
          <ChatListItem
            key={room.id}
            {...room}
            isSelected={selectedId === room.id}
            onClick={onRoomSelect}
          />
        ))}
      </div>
    </div>
  );
}
