"use client";

import { GetInvitationsParams } from "@/types/invitation";
import { Selector } from "./Selector";
import { Button } from "./Button";

interface FilterBarProps {
  size: "sm" | "md" | "lg";
  currentParams: GetInvitationsParams;
  onFilterChange: (newParams: GetInvitationsParams) => void;
}

export function FilterInvitationStatus({
  size = "lg",
  currentParams,
  onFilterChange,
}: FilterBarProps) {
  const STATUS_OPTIONS = [
    { value: "", label: "전체 상태" },
    { value: "pending", label: "가입 전" },
    { value: "accepted", label: "가입 완료" },
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-1">
        <Selector
          size={size}
          value={currentParams.status || ""}
          options={STATUS_OPTIONS}
          onChange={(val) =>
            onFilterChange({
              ...currentParams,
              status: val as GetInvitationsParams["status"],
            })
          }
        />
      </div>

      {currentParams.status && (
        <Button
          variant="none"
          size={size}
          onClick={() => onFilterChange({})}
          className="!w-auto"
        >
          필터 초기화
        </Button>
      )}
    </div>
  );
}
