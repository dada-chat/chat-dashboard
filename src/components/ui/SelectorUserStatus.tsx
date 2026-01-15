import { USER_STATUS } from "@/constants/user";
import { UserStatus } from "@/types/user";
import { Selector } from "./Selector";
import { UserRole } from "@/types/auth";

export const USER_STATUS_OPTIONS = Object.entries(USER_STATUS).map(
  ([value, config]) => ({
    value: value as UserStatus,
    label: config.label,
    icon: config.icon,
    color: config.color,
  })
);
interface UserStatusSelectProps {
  value: UserStatus;
  selectName?: string;
  onChange: (value: UserStatus) => void;
  currentUserRole?: UserRole;
  targetUserRole?: UserRole;
}

export function SelectorUserStatus({
  value,
  selectName,
  onChange,
  currentUserRole,
  targetUserRole,
}: UserStatusSelectProps) {
  // 로그인 유저 권한 확인
  const isAdmin = currentUserRole === "ADMIN";
  // 최고관리자가 아닌 경우, 최고관리자 계정은 수정 불가
  const isDisabled = !isAdmin && targetUserRole === "ADMIN";

  return (
    <div className="flex flex-col gap-1">
      {selectName && (
        <label className="text-sm font-medium text-gray-700 lg:text-base">
          {selectName}
        </label>
      )}
      <Selector
        value={value}
        onChange={onChange}
        options={USER_STATUS_OPTIONS}
        disabled={isDisabled}
      />
      {isDisabled && (
        <p className="text-xs text-gray-400">
          *최고관리자 계정 상태는 변경할 수 없습니다.
        </p>
      )}
    </div>
  );
}
