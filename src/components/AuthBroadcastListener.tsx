"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { NAVIGATION } from "@/constants/navigation";

export default function AuthBroadcastListener() {
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "dadachat-signout") {
        useAuthStore.getState().signout();
        window.location.href = NAVIGATION.SIGNIN;
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return null;
}
