"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { NAVIGATION } from "@/constants/navigation";

interface UseAuthGuardOptions {
  redirectTo?: string;
}

export function useAuthGuard(options?: UseAuthGuardOptions) {
  const router = useRouter();
  const { accessToken, user, hasHydrated } = useAuthStore();

  const isAuthenticated = Boolean(accessToken && user);
  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      router.replace(options?.redirectTo ?? NAVIGATION.SIGNIN);
    }
  }, [hasHydrated, isAuthenticated, router, options?.redirectTo]);

  return {
    isAuthenticated,
    isLoading: !hasHydrated,
    user,
  };
}
