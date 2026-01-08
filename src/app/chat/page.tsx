"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import VisitorInfo from "@/components/chat/VisitorInfo";
import NodataArea from "@/components/ui/NodataArea";

export default function ChattingPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden px-4 pb-4 gap-4">
        {/* 1. 좌측: 채팅 목록 (350px) */}
        <div className="w-[380px]">
          <ChatList
            onRoomSelect={setSelectedRoomId}
            selectedId={selectedRoomId}
          />
        </div>

        {/* 채팅창 (flex-1) */}
        <div className="flex-1 flex flex-col">
          {selectedRoomId ? (
            <ChatWindow roomId={selectedRoomId} />
          ) : (
            <NodataArea
              content="문의사항에 대한 상담을 진행할 채팅방을 선택해주세요."
              iscenter={true}
              className="!bg-gray-200 rounded-lg"
            />
          )}
        </div>

        {/* 우측: 고객 정보 */}
        {selectedRoomId && (
          <div className="w-[300px]  bg-white">
            <VisitorInfo roomId={selectedRoomId} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
