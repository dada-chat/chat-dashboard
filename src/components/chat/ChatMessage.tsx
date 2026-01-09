"use client";

import clsx from "clsx";

interface ChatMessageProps {
  content: string;
  time: string;
  isUser?: boolean;
}

export function ChatMessage({
  content,
  time,
  isUser = false,
}: ChatMessageProps) {
  return (
    <div
      className={clsx("flex flex-col", isUser ? "items-end" : "items-start")}
    >
      <div
        className={clsx(
          "p-3 max-w-[70%] shadow-sm text-sm",
          isUser
            ? "bg-primary text-white rounded-2xl rounded-tr-none font-medium" // 로그인 유저 스타일
            : "bg-white border border-gray-300 text-gray-800 rounded-2xl rounded-tl-none" // 상대방 스타일
        )}
      >
        <p>{content}</p>
      </div>
      <span
        className={clsx(
          "text-[10px] text-gray-400 mt-1",
          isUser ? "mr-1" : "ml-1"
        )}
      >
        {time}
      </span>
    </div>
  );
}
