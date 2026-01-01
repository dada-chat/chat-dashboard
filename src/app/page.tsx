"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { NAVIGATION } from "@/constants/navigation";

export default function Home() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace(NAVIGATION.CHAT);
    } else {
      router.replace(NAVIGATION.SIGNIN);
    }
  }, [accessToken, router]);

  return null;
}
