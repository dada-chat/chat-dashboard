import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  setAuth: (user: any, access: string) => void;
  setAccessToken: (token: string) => void;
  signout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user, access) => set({ user, accessToken: access }),
      setAccessToken: (token) => set({ accessToken: token }),
      signout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "dadachat-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
