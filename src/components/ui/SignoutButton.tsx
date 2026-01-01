"use client";

import { signout } from "@/lib/auth";
import { broadcastSignout } from "@/lib/authBroadcast";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { NAVIGATION } from "@/constants/navigation";

export const SignoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signout();
    broadcastSignout();
    router.replace(NAVIGATION.SIGNIN);
  };

  return (
    <Button variant="none" size="sm" onClick={handleLogout} className="w-auto">
      로그아웃
    </Button>
  );
};
