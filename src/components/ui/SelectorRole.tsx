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
  let isDisabled = false;
  if (currentUserRole && targetUserRole) {
    isDisabled = currentUserRole !== "ADMIN" && targetUserRole === "ADMIN";
  }

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
        disabled={isDisabled}
      />

      {isDisabled && (
        <p className="text-xs text-gray-400">
          *최고관리자의 권한은 변경할 수 없습니다.
        </p>
      )}
    </div>
  );
}
