"use client";

import { useState } from "react";
import { Send, MessageCircleX } from "lucide-react";
import { FormInput } from "../ui/FormInput";
import { Button } from "../ui/Button";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/types/chatting";
import { formatChatDate } from "@/utils/date";

interface ChatWindowProps {
  roomId: string;
  messages: Message[] | null;
  onMessageSent?: () => void;
}

export default function ChatWindow({
  roomId,
  messages,
  onMessageSent,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasMessages = messages && messages.length > 0;
  const displayMessages = hasMessages ? [...messages].reverse() : [];

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white overflow-hidden">
      {/* 채팅창 헤더 */}
      <div className="py-4  px-6 border-b border-gray-300 bg-white flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1 items-start">
          <p className="text-sm text-gray-600">
            채팅방 ID:
            <span className="text-gray-800 font-semibold">{roomId}</span>
          </p>
          <span className="rounded-2xl py-1 px-2.5 font-semibold text-xs text-primary bg-primary-lightest">
            상담 가능
          </span>
        </div>
        <div>
          <Button
            variant="none"
            size="md"
            className="text-xs !gap-1 hover:underline"
          >
            <MessageCircleX className="w-4 h-4" />
            <span>상담 종료</span>
          </Button>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInput("");
          }}
          className="flex gap-2 items-start"
        >
          <FormInput
            value={input}
            placeholder="메시지를 입력하세요."
            onChange={setInput}
          />
          <Button
            type="submit"
            className="!w-[48px] !px-0"
            disabled={!input.trim()}
            isLoading={isLoading}
          >
            <Send className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
