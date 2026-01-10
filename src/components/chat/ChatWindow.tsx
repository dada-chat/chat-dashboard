"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Send, MessageCircleX } from "lucide-react";
import { FormInput } from "../ui/FormInput";
import { Button } from "../ui/Button";
import { ChatMessage } from "./ChatMessage";
import { ChattingRoomStatus, Message } from "@/types/chatting";
import { formatChatDate } from "@/utils/date";
import { sendNewMessage, updateChattingRoomStatus } from "@/lib/chatting";
import { SOCKET_URL } from "@/app/chat/layout";

interface ChatWindowProps {
  roomId: string;
  messages: Message[] | null;
  chattingRoomStatus: ChattingRoomStatus;
  onMessageSent?: () => void;
}

export default function ChatWindow({
  roomId,
  messages,
  chattingRoomStatus,
  onMessageSent,
}: ChatWindowProps) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await sendNewMessage({
        conversationId: roomId,
        content,
      });
      if (!response.success) {
        // 에러 메세지
      }
      setContent("");
      if (onMessageSent) onMessageSent();
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      alert("메시지를 보내지 못했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const hasMessages = messages && messages.length > 0;
  const displayMessages = hasMessages ? [...messages].reverse() : [];

  // 채팅 상태
  const isChattingOpen = chattingRoomStatus === "OPEN";

  const handleChattingRoomStatus = async (status: ChattingRoomStatus) => {
    if (!confirm("해당 채팅방의 상담을 종료할까요?")) return;

    const response = await updateChattingRoomStatus(roomId, status);

    if (response.success) {
      if (onMessageSent) onMessageSent();
    }
  };

  useEffect(() => {
    if (!roomId) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: false,
    });

    // 소켓 연결 확인
    socket.on("connect", () => {
      console.log(`[Window 소켓] ${roomId}번 방 입장 시도`);
      socket.emit("join_chattingroom", roomId);
    });

    // 메시지 수신
    socket.on("message_received", (newMessage) => {
      console.log("새 메시지 수신:", newMessage);

      // 메시지 목록 fetchChattingRoom 실행
      if (onMessageSent) onMessageSent();
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white overflow-hidden">
      {/* 채팅창 헤더 */}
      <div className="py-4  px-6 border-b border-gray-300 bg-white flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1 items-start">
          <p className="text-sm text-gray-600">
            채팅방 ID:&nbsp;
            <span className="text-gray-800 font-semibold">{roomId}</span>
          </p>
          {isChattingOpen ? (
            <span className="rounded-2xl py-1 px-2.5 font-semibold text-xs text-primary bg-primary-lightest">
              상담 가능
            </span>
          ) : (
            <span className="rounded-2xl py-1 px-2.5 font-semibold text-xs text-gray-400 bg-gray-300">
              상담 종료
            </span>
          )}
        </div>
        {isChattingOpen && (
          <div>
            <Button
              type="button"
              variant="none"
              size="md"
              className="text-xs !gap-1 hover:underline"
              onClick={() => handleChattingRoomStatus("CLOSED")}
            >
              <MessageCircleX className="w-4 h-4" />
              <span>상담 종료</span>
            </Button>
          </div>
        )}
      </div>

      {/* 메시지 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100"
      >
        {hasMessages &&
          displayMessages.map((item) => {
            return (
              <ChatMessage
                key={item.id}
                content={item.content}
                time={formatChatDate(item.createdAt)}
                isUser={item.senderType === "USER"}
              />
            );
          })}
      </div>

      {/* 입력 영역 */}
      <div className="py-4 px-6 bg-white border-t border-gray-300">
        <form onSubmit={handleSubmit} className="flex gap-2 items-start">
          <FormInput
            value={content}
            placeholder="메시지를 입력하세요."
            onChange={setContent}
            disabled={!isChattingOpen}
          />
          <Button
            type="submit"
            className="!w-[48px] !px-0"
            disabled={!isChattingOpen || isSending}
          >
            <Send className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
