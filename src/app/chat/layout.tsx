"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatList from "@/components/chat/ChatList";
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { getDashboardSocket } from "@/lib/socket";

export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshTrigger, triggerRefresh } = useChatStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const orgId = user.organizationId;

    const socket = getDashboardSocket();

    if (socket.connected) {
      console.log("[Layout] 이미 연결된 상태 → org join");
      socket.emit("update_conversation_list", orgId);
    }

    // 소켓 연결 확인
    socket.on("connect", () => {
      console.log("[Layout 소켓] 연결 성공! ID:", socket.id);

      console.log(`[Layout] org_${orgId} 채널 입장 시도`);
      socket.emit("update_conversation_list", orgId);
    });

    //  목록 업데이트 이벤트 수신
    socket.on("update_conversation_list", (data) => {
      console.log("목록 갱신 신호:", data);
      triggerRefresh(); // ChatList를 재호출
    });

    // 에러 핸들링 추가
    socket.on("connect_error", (err) => {
      console.error("[Layout 소켓] 연결 실패:", err.message);
    });

    return () => {
      socket.off("update_conversation_list");
    };
  }, [user, triggerRefresh]);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden px-4 pb-4 gap-4">
        {/* 좌측: 채팅 목록 (고정) */}
        <div className="w-[380px]">
          <ChatList refreshTrigger={refreshTrigger} />
        </div>

        {/* 우측 콘텐츠 영역 (page.tsx 혹은 [roomId]/page.tsx가 들어옴) */}
        <div className="flex-1 flex gap-4">{children}</div>
      </div>
    </DashboardLayout>
  );
}
