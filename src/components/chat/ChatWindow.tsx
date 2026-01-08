"use client";

import { useState } from "react";
import { Send, MessageCircleX } from "lucide-react";
import { FormInput } from "../ui/FormInput";
import { Button } from "../ui/Button";
import { ChatMessage } from "./ChatMessage";

export default function ChatWindow({ roomId }: { roomId: string }) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg bg-white overflow-hidden">
      {/* 채팅창 헤더 */}
      <div className="py-4  px-6 border-b border-gray-300 bg-white flex items-center justify-between shadow-sm">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-600">
            채팅방 ID:{" "}
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
        {/* 상대방 메시지 */}
        <ChatMessage
          content="안녕하세요, 도메인 설정이 안 돼요."
          time="오후 2:20"
        />

        {/* 내(어드민) 메시지 */}
        <ChatMessage
          content="네, 고객님! 어떤 도메인인지 알려주시겠어요?"
          time="오후 2:21"
          isUser
        />
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
          <Button type="submit" className="!w-[48px] !px-0">
            <Send className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
