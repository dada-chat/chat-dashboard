"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "disabled" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const baseStyle =
  "group relative inline-flex w-full items-center justify-center rounded-md font-medium focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400";

const variantStyle: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-gray-900 hover:bg-gray-200",
  disabled: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizeStyle: Record<ButtonSize, string> = {
  sm: "px-3 h-6 text-sm",
  md: "px-4 h-8 text-sm",
  lg: "px-5 h-12 text-base",
};

export function Button({
  children,
  type = "button",
  variant = "primary",
  size = "lg",
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        baseStyle,
        variantStyle[variant],
        sizeStyle[size],
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className
      )}
      {...props}
    >
      {isLoading ? "처리 중..." : children}
    </button>
  );
}
