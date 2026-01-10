import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  hasHydrated: boolean;
  setAuth: (user: AuthUser, access: string) => void;
  setAccessToken: (token: string) => void;
  signout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      hasHydrated: false,
      setAuth: (user, access) => set({ user, accessToken: access }),
      setAccessToken: (token) => set({ accessToken: token }),
      signout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "dadachat-auth",
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
