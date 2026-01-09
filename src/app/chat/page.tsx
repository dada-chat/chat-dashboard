"use client";
import { useState, useEffect } from "react";
import NodataArea from "@/components/ui/NodataArea";

export default function ChattingPage() {
  return (
    <div className="flex-1 flex flex-col">
      <NodataArea
        content="문의사항에 대한 상담을 진행할 채팅방을 선택해주세요."
        iscenter={true}
        className="!bg-gray-200 rounded-lg"
      />
    </div>
  );
}
