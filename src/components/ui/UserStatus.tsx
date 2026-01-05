import { USER_STATUS } from "@/constants/user";
import { UserStatus } from "@/types/user";
import clsx from "clsx";

interface UserStatusProps {
  status: UserStatus;
}

export function UserStatusBadge({ status }: UserStatusProps) {
  const { label, icon: Icon, color } = USER_STATUS[status];

  return (
    <span className="flex items-center gap-1 rounded-lg font-medium text-gray-700">
      <Icon className={clsx("w-4 h-4", color)} />
      {label}
    </span>
  );
}
