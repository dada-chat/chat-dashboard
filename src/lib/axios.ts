import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { signout } from "./auth";
import { broadcastSignout } from "./authBroadcast";
import { NAVIGATION } from "@/constants/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// 1. 요청 인터셉터: 모든 요청에 Access Token 추가 로직
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. 응답 인터셉터: 401(만료) 시 자동 리프레시 로직
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data;
        useAuthStore.getState().setAccessToken(accessToken); // 새 토큰 저장

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest); // 실패했던 요청 재시도
      } catch (refreshError) {
        await signout();
        broadcastSignout();
        window.location.href = NAVIGATION.SIGNIN;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
