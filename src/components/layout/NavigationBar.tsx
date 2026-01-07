"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronsRight, ChevronsLeft } from "lucide-react";
import { useLnbStore } from "@/store/lnbStore";
import { useAuthStore } from "@/store/authStore";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "../ui/Button";
import { SignoutButton } from "../ui/SignoutButton";
import { COMMON_NAV_ITEMS } from "@/constants/navigation";
import { MenuItem } from "./MenuItem";

export default function NavigationBar() {
  const pathname = usePathname();
  const { isSidebarExpanded, toggleSidebar } = useLnbStore();
  const { user } = useAuthStore();
  let userRole;
  if (user) userRole = user?.role;

  return (
    <aside
      className={clsx(
        "relative flex flex-col bg-gray-100 text-gray-600 transition-all border-r border-gray-200 duration-200 ease-in-out",
        isSidebarExpanded ? "w-64" : "w-18"
      )}
    >
      {/* 로고 영역 */}
      <div
        className={clsx(
          "flex h-16 items-center gap-4 justify-between px-4",
          !isSidebarExpanded &&
            "flex-col gap-0.5 h-auto py-3 border-b border-gray-300"
        )}
      >
        <Link href={"/"}>
          {isSidebarExpanded ? (
            <Image
              src="/images/logo.svg"
              alt="DadaChat logo"
              width={160}
              height={36}
            />
          ) : (
            <Image
              src="/images/logo_symbol.svg"
              alt="DadaChat logo"
              width={40}
              height={40}
            />
          )}
        </Link>
        <Button
          onClick={toggleSidebar}
          variant="none"
          size="md"
          className="!w-auto !px-1 bg-gray-100 !text-gray-400 hover:bg-gray-200"
        >
          {isSidebarExpanded ? <ChevronsLeft /> : <ChevronsRight />}
        </Button>
      </div>

      {/* 메뉴 영역 */}
      <nav className="flex-1 space-y-2 p-4">
        <ul className="flex flex-col gap-2">
          {COMMON_NAV_ITEMS.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              isActive={pathname.startsWith(item.href)}
              isSidebarExpanded={isSidebarExpanded}
            />
          ))}
        </ul>
      </nav>

      {/* 하단 유저/토글 영역 */}
      <div className="px-4 py-6">
        <SignoutButton
          size="md"
          className="!px-1 hover:text-red-400"
          variant="none"
        >
          <LogOut className="h-5 w-5" />
          {isSidebarExpanded && <span>로그아웃</span>}
        </SignoutButton>
      </div>
    </aside>
  );
}
