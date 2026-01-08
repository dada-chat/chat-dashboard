"use client";

import { User, Mail, Calendar } from "lucide-react";

export default function VisitorInfo({ roomId }: { roomId: string | null }) {
  if (!roomId) return null;

  return (
    <div className="p-6 flex flex-col gap-6 border border-gray-300 rounded-lg">
      <h3 className="font-bold text-gray-800">문의자 정보</h3>

      <div className="flex flex-col items-center gap-2 pb-6 border-b">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <User className="w-8 h-8" />
        </div>
        <p className="font-bold text-lg">김철수님</p>
        <span className="text-sm text-gray-600">chulsoo@example.com</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>문의 chulsoo@example.com</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>문의 일시: 2024.01.15</span>
        </div>
      </div>
    </div>
  );
}
