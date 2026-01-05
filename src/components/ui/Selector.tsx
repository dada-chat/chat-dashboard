import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Button } from "./Button";

interface Option<T> {
  value: T;
  label: string;
}

interface SelectorProps<T extends string> {
  value: T;
  options: Option<T>[];
  onChange: (newValue: T) => void;
  disabled?: boolean;
}

export function Selector<T extends string>({
  value,
  options,
  onChange,
  disabled,
}: SelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <div className="relative">
      {/* Trigger */}
      <Button
        type="button"
        variant="line"
        onClick={() => setOpen((v) => !v)}
        className={clsx("!justify-between", open && "!border-gray-600")}
      >
        <span className="flex items-center gap-2">{current?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow">
          {options.map((option) => (
            <li key={option.value}>
              <Button
                type="button"
                variant="none"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="!justify-start hover:bg-gray-100"
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
