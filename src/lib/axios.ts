import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { signout } from "./auth";
import { broadcastSignout } from "./authBroadcast";
import { NAVIGATION } from "@/constants/navigation";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const isAxiosError = axios.isAxiosError;

// 1. 요청 인터셉터: 모든 요청에 Access Token 추가 로직
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface FailedRequest {
  resolve: (token: string) => void; // 토큰은 문자열로 확정
  reject: (error: AxiosError) => void; // any 대신 AxiosError 사용
}
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. 응답 인터셉터: 401(만료) 시 자동 리프레시 로직
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // [중요] 이미 리프레시 중이라면 큐에 담고 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data;
        useAuthStore.getState().setAccessToken(accessToken); // 새 토큰 저장

        // 대기하던 다른 요청(failedQueue)들에게 새 토큰 배포
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest); // 실패했던 요청 재시도
      } catch (refreshError) {
        console.error("[인터셉터] refresh 실패 → 로그아웃");
        const error = refreshError as AxiosError;
        processQueue(error, null);
        await handleForceSignout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// 공통 로그아웃 처리 함수
async function handleForceSignout() {
  await signout();
  broadcastSignout();
  window.location.href = NAVIGATION.SIGNIN;
}
