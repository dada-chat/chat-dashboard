import { NavItem } from "@/constants/navigation";
import clsx from "clsx";
import Link from "next/link";

interface MenuItemProps {
  item: NavItem;
  isActive: boolean;
  isSidebarExpanded: boolean;
}

export function MenuItem({ item, isActive, isSidebarExpanded }: MenuItemProps) {
  return (
    <li>
      <Link
        href={item.href}
        className={clsx(
          "flex items-center gap-2 rounded-lg h-10 transition-colors",
          isSidebarExpanded ? "px-4" : "px-1 justify-center",
          isActive
            ? "bg-primary text-white font-semibold"
            : "hover:bg-gray-200 hover:text-gray-800 hover:font-medium"
        )}
      >
        <item.icon className="h-5 w-5" />
        {isSidebarExpanded && <span>{item.name}</span>}
      </Link>
    </li>
  );
}
