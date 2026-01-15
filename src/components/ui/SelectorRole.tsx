import { USER_ROLE } from "@/constants/user";
import { UserRole } from "@/types/auth";
import { Selector } from "./Selector";

export const USER_ROLE_OPTIONS = Object.entries(USER_ROLE).map(
  ([value, config]) => ({
    value: value as UserRole,
    label: config.label,
  })
);

interface UserRoleSelectProps {
  value: UserRole;
  selectName?: string;
  onChange: (value: UserRole) => void;
  currentUserRole?: UserRole;
  targetUserRole?: UserRole;
}

export function SelectorRole({
  value,
  selectName,
  onChange,
  currentUserRole,
  targetUserRole,
}: UserRoleSelectProps) {
  // 로그인 유저 권한 확인
  const isAdmin = currentUserRole === "ADMIN";
  // 최고관리자가 아닌 경우, 최고관리자 계정은 수정 불가
  const isDisabled = !isAdmin && targetUserRole === "ADMIN";

  const dropdownOptions =
    currentUserRole === "ADMIN"
      ? USER_ROLE_OPTIONS
      : USER_ROLE_OPTIONS.filter((option) => option.value !== "ADMIN");

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
        options={USER_ROLE_OPTIONS}
        dropdownOptions={dropdownOptions}
        disabled={isDisabled}
      />

      {isDisabled && (
        <p className="text-xs text-gray-400">
          *최고관리자 권한은 변경할 수 없습니다.
        </p>
      )}
    </div>
  );
}
