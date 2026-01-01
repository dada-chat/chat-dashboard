import api from "./axios";
import { useAuthStore } from "@/store/authStore";

export const signout = async () => {
  try {
    await api.post("/auth/signout");
    console.log(api.defaults.baseURL);
  } catch (error) {
    console.warn("[Signout] 서버 로그아웃 실패", error);
  } finally {
    useAuthStore.getState().signout();
  }
};
