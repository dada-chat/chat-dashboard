"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { Button } from "./Button";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  variant?: "center" | "right";
  className?: string;
  children: ReactNode;
  title?: string;
}

export function Modal({
  isOpen,
  onClose,
  variant = "center",
  className,
  children,
  title,
}: ModalProps) {
  const centerStyle =
    "top-30 left-1/2 w-11/12 max-w-[460px] -translate-x-1/2 rounded-lg";
  const rightStyle =
    "inset-0 top-0 right-0 left-auto h-screen flex flex-col w-[420px] rounded-l-lg";
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 z-40 bg-black/50" onClick={onClose} />

      {/* Modal Inner */}
      <div
        className={clsx(
          "absolute z-50 bg-white shadow-lg",
          variant === "center" && centerStyle,
          variant === "right" && rightStyle,
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between py-4 px-6">
            <h3 className="flex-1 font-semibold text-lg">{title}</h3>
            <Button
              variant="none"
              size="md"
              className="!w-[32px] !px-0"
              onClick={onClose}
            >
              <X />
              <span className="sr-only">모달 닫기</span>
            </Button>
          </div>
        )}
        <div className="flex flex-col flex-1 py-4 px-6">{children}</div>
      </div>
    </div>
  );
}
