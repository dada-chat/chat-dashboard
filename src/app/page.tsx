"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      router.replace("/chat");
    } else {
      router.replace("/auth/signin");
    }
  }, [accessToken, router]);

  return null; // 화면 표시 X
}
