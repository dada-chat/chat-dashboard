"use client";

import { signout } from "@/lib/auth";
import { broadcastSignout } from "@/lib/authBroadcast";
import { useRouter } from "next/navigation";
import { Button, ButtonSize, ButtonVariant } from "./Button";
import { NAVIGATION } from "@/constants/navigation";
import { useState } from "react";
import { disconnectDashboardSocket } from "@/lib/socket";

interface SignoutButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
}

export const SignoutButton = ({
  variant = "none",
  size = "sm",
  children,
  className = "!w-auto",
}: SignoutButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    await signout();
    broadcastSignout();

    // 소켓 연결 해지
    disconnectDashboardSocket();
    router.replace(NAVIGATION.SIGNIN);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
      disabled={isLoading}
    >
      {children ? children : "로그아웃"}
    </Button>
  );
};
