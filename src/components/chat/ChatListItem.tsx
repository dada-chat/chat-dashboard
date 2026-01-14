"use client";

import { ChattingListItem } from "@/types/chatting";
import { formatChatDate } from "@/utils/date";
import clsx from "clsx";

interface ChatListItemProps {
  data: ChattingListItem;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export function ChatListItem({ data, isSelected, onClick }: ChatListItemProps) {
  return (
    <div
      onClick={() => onClick(data.id)}
      className={clsx(
        "py-4 px-6 border-b border-gray-300 cursor-pointer transition-colors hover:bg-gray-100",
        data.status === "CLOSED" && "!bg-gray-200",
        isSelected
          ? "!bg-primary-lightest border-l-4 border-l-primary"
          : "bg-white"
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-semibold text-gray-900">{data.visitorName}</span>
        <span className="text-xs text-gray-400">
          {formatChatDate(data.lastMessageAt)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 truncate w-10/12">
          {data.lastMessage}
        </p>
        {data.unreadCount > 0 && (
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {data.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}
