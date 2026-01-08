"use client";

import clsx from "clsx";

interface ChatListItemProps {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export function ChatListItem({
  id,
  name,
  lastMsg,
  time,
  isSelected,
  onClick,
}: ChatListItemProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={clsx(
        "py-4 px-6 border-b border-gray-300 cursor-pointer transition-colors hover:bg-gray-100",
        isSelected
          ? "bg-primary-lightest border-l-4 border-l-primary"
          : "bg-white"
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-semibold text-gray-900">{name}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 truncate w-48">{lastMsg}</p>
      </div>
    </div>
  );
}
