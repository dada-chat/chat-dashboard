"use client";

import { SenderType } from "@/types/chatting";
import clsx from "clsx";

interface ChatMessageProps {
  content: string;
  time: string;
  senderType: SenderType;
}

export function ChatMessage({
  content,
  time,
  senderType = "USER",
}: ChatMessageProps) {
  return (
    <div
      className={clsx(
        "flex flex-col",
        senderType === "USER" && "items-end",
        senderType === "VISITOR" && "items-start",
        senderType === "SYSTEM" && "items-center"
      )}
    >
      <div
        className={clsx(
          "p-3 max-w-[70%] shadow-sm text-sm",
          senderType === "USER" &&
            "bg-primary text-white rounded-2xl rounded-tr-none font-medium", // 로그인 유저 스타일
          senderType === "VISITOR" &&
            "bg-white border border-gray-300 text-gray-800 rounded-2xl rounded-tl-none", // 상대방 스타일
          senderType === "SYSTEM" &&
            "bg-white rounded-2xl text-gray-400 !shadow-none !py-2 !px-4 text-xs"
        )}
      >
        <p>{content}</p>
      </div>
      <span
        className={clsx(
          "text-[10px] text-gray-400 mt-1",
          senderType === "USER" && "mr-1",
          senderType === "VISITOR" && "ml-1"
        )}
      >
        {time}
      </span>
    </div>
  );
}
