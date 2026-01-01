"use client";
import { SignoutButton } from "@/components/ui/SignoutButton";
import { NAVIGATION } from "@/constants/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
export default function ChattingPage() {
  const { isAuthenticated, user } = useAuthGuard();

  if (!isAuthenticated) return null;

  return (
    <>
      <div>{user?.name}님의 채팅페이지</div>
      <SignoutButton />
    </>
  );
}
