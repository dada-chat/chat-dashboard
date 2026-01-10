"use client";

import { USER_ROLE } from "@/constants/user";
import { AssignedUser, Visitor } from "@/types/chatting";
import { Domain } from "@/types/domain";
import { formatDateTime } from "@/utils/date";
import { User, Link as LinkIcon, Calendar } from "lucide-react";
import Link from "next/link";
import InfoItem from "./InfoItem";

interface ChatMembersInfoProps {
  roomId: string | null;
  firstMessageAt: Date | null;
  visitor: Visitor | null;
  domain: Domain | null;
  assignedUser: AssignedUser | null;
}
export default function ChatMembersInfo({
  roomId,
  firstMessageAt,
  visitor,
  domain,
  assignedUser,
}: ChatMembersInfoProps) {
  if (!roomId) return null;

  const visitorFirstMessageAt = firstMessageAt
    ? formatDateTime(firstMessageAt)
    : "-";
  const lastAnsweredAt = assignedUser?.lastAnsweredAt
    ? formatDateTime(assignedUser.lastAnsweredAt)
    : "-";
  const assignedUserRole = assignedUser?.role
    ? USER_ROLE[assignedUser.role]?.label
    : "-";

  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 flex flex-col gap-6 border border-gray-300 rounded-lg">
        <h3 className="font-bold text-gray-800">문의자 정보</h3>

        <div className="flex flex-col items-center gap-2.5 pb-6 border-b border-gray-300">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <User className="w-8 h-8" />
          </div>
          <div className="flex flex-col w-full text-center">
            <p className="font-bold text-lg">{visitor?.name}님</p>
            <span className="text-sm text-gray-600">{visitor?.email}</span>
          </div>
        </div>

        <div className="space-y-4">
          <InfoItem icon={<LinkIcon className="w-4 h-4" />} label="문의 도메인">
            {domain ? (
              <Link
                href={domain.domainUrl}
                target="_blank"
                className="text-gray-800 font-semibold hover:text-primary hover:underline"
              >
                {domain.domainUrl}
              </Link>
            ) : (
              <>-</>
            )}
          </InfoItem>
          <InfoItem icon={<Calendar className="w-4 h-4" />} label="문의 일시">
            {visitorFirstMessageAt}
          </InfoItem>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-6 border border-gray-300 rounded-lg">
        <h3 className="font-bold text-gray-800">담당자 정보</h3>

        <div className="space-y-4">
          <InfoItem icon={<User className="w-4 h-4" />} label="최근 CS 담당자">
            <span className="font-semibold">{assignedUser?.name ?? "-"}</span>
            <span className="text-gray-600 font-medium">
              &#40;{assignedUserRole}&#41;
            </span>
          </InfoItem>
          <InfoItem
            icon={<Calendar className="w-4 h-4" />}
            label="최근 답변 일시"
          >
            {lastAnsweredAt}
          </InfoItem>
        </div>
      </div>
    </div>
  );
}
