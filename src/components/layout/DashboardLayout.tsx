// app/(dashboard)/layout.tsx
import NavigationBar from "@/components/layout/NavigationBar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import ContentHeader from "./ContentHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useAuthGuard();

  // 비로그인 상태
  if (!isAuthenticated) return null;

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Lnb */}
        <NavigationBar />
        <div className="flex flex-col flex-1 bg-white">
          <ContentHeader user={user} />
          {/* 페이지 컨텐츠 영역 */}
          <main className="flex-1 overflow-hidden relative">{children}</main>
        </div>
      </div>
    </>
  );
}
