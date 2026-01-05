import { USER_STATUS } from "@/constants/user";
import { UserStatus } from "@/types/user";
import { Selector } from "./Selector";

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
}

export function SelectorUserStatus({
  value,
  selectName,
  onChange,
}: UserStatusSelectProps) {
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
      />
    </div>
  );
}
