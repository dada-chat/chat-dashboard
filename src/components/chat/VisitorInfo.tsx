"use client";

import { User, Link, Calendar } from "lucide-react";

export default function VisitorInfo({ roomId }: { roomId: string | null }) {
  if (!roomId) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 flex flex-col gap-6 border border-gray-300 rounded-lg">
        <h3 className="font-bold text-gray-800">문의자 정보</h3>

        <div className="flex flex-col items-center gap-2 pb-6 border-b border-gray-300">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <User className="w-8 h-8" />
          </div>
          <p className="font-bold text-lg">김철수님</p>
          <span className="text-sm text-gray-600">chulsoo@example.com</span>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 text-sm py-2.5 px-4 items-center bg-gray-100 rounded-lg">
            <Link className="w-4 h-4" />
            <div className="flex flex-col gap-0.5 text-sm">
              <span className="flex gap-1 items-center text-xs text-gray-600 ">
                문의 도메인
              </span>
              <p className="text-gray-800">https://www.naver.com</p>
            </div>
          </div>
          <div className="flex gap-2 text-sm py-2.5 px-4 items-center bg-gray-100 rounded-lg">
            <Calendar className="w-4 h-4" />
            <div className="flex flex-col gap-0.5 text-sm">
              <span className="flex gap-1 items-center text-xs text-gray-600 ">
                문의 일시
              </span>
              <p className="text-gray-800">2024.01.15</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-6 border border-gray-300 rounded-lg">
        <h3 className="font-bold text-gray-800">담당자 정보</h3>

        <div className="space-y-4">
          <div className="flex flex-col gap-1 text-sm">
            <p className="flex gap-1 items-center text-gray-600">
              <User className="w-4 h-4" />
              <span>최근 CS 담당자</span>
            </p>
            <p className="text-gray-800">담당자 이름</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-600">
            <p className="flex gap-1 items-center">
              <Calendar className="w-4 h-4" />
              <span>마지막 답변 일시</span>
            </p>
            <p className="text-gray-800">2024.01.15</p>
          </div>
        </div>
      </div>
    </div>
  );
}
