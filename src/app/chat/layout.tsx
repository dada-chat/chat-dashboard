import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatList from "@/components/chat/ChatList";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-64px)] overflow-hidden px-4 pb-4 gap-4">
        {/* 좌측: 채팅 목록 (고정) */}
        <div className="w-[380px]">
          <ChatList />
          {/* ChatList 내부에서는 이제 selectedId를 URL 파라미터에서 읽어오도록 수정합니다. */}
        </div>

        {/* 우측 콘텐츠 영역 (page.tsx 혹은 [roomId]/page.tsx가 들어옴) */}
        <div className="flex-1 flex gap-4">{children}</div>
      </div>
    </DashboardLayout>
  );
}
