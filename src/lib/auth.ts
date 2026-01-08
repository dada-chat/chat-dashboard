import api, { isAxiosError } from "./axios";
import { useAuthStore } from "@/store/authStore";
import {
  CreateUserAsAgent,
  CreateUserByInvitation,
  SignUpResponse,
} from "@/types/auth";

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

// 일반 회원가입: 새로운 조직과 AGENT 계정 생성
export const signUpAsAgentWithOrganization = async (
  data: CreateUserAsAgent
): Promise<SignUpResponse> => {
  try {
    const response = await api.post<SignUpResponse>("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("담당자 회원가입(signUpAgent) error:", error);
    return {
      success: false,
      message: "사용자 추가 과정에서 오류가 발생했습니다.",
      data: null,
    };
  }
};

// 초대 회원가입: 기존 조직 소속으로 생성
export const signUpByInvitation = async (
  data: CreateUserByInvitation
): Promise<SignUpResponse> => {
  try {
    const response = await api.post<SignUpResponse>(
      "/auth/signup/invitation",
      data
    );
    return response.data;
  } catch (error) {
    console.error("초대를 통한 회원가입(signUpByInvitation) error:", error);
    if (isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      console.error("서버 에러 발생:", serverMessage);

      return {
        success: false,
        data: null,
        message: serverMessage || "희원가입 과정에서 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "시스템 오류가 발생했습니다.",
      data: null,
    };
  }
};
