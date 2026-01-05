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
}

export function SelectorRole({
  value,
  selectName,
  onChange,
}: UserRoleSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {selectName && (
        <label className="text-sm font-medium text-gray-700 lg:text-base">
          {selectName}
        </label>
      )}
      <Selector value={value} onChange={onChange} options={USER_ROLE_OPTIONS} />
    </div>
  );
}
