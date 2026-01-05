"use client";
import { AuthUser } from "@/types/auth";
import { usePathname } from "next/navigation";
import { COMMON_NAV_ITEMS, ROLE_NAV_ITEMS } from "@/constants/navigation";
import { USER_ROLE } from "@/constants/user";

interface ContentHeaderProps {
  user: AuthUser | null;
}

export default function ContentHeader({ user }: ContentHeaderProps) {
  const pathname = usePathname();

  // 모든 메뉴 합치기
  const allMenus = [...COMMON_NAV_ITEMS, ...ROLE_NAV_ITEMS];
  // 현재 경로에 맞는 메뉴명 찾기
  const currentMenu = allMenus.find((item) => pathname.startsWith(item.href));

  return (
    <header className="flex items-center justify-between px-6 h-16 bg-white">
      <div className="flex items-center gap-4">
        {/* 페이지 타이틀 */}
        <h1 className="text-lg font-semibold text-gray-900">
          {currentMenu ? `${currentMenu.name} 관리` : "대시보드"}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary-lightest flex items-center justify-center border-primary-light text-primary text-base font-bold">
          {user?.email?.[0].toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">{user?.name}</div>
          <div className="text-[11px] text-gray-500 uppercase">
            {user ? <span>{USER_ROLE[user.role].label}</span> : "-"}
          </div>
        </div>
      </div>
    </header>
  );
}
