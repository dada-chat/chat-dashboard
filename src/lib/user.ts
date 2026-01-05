import { UserRole } from "@/types/auth";
import api from "./axios";
import { UserResponse } from "@/types/user";

// 조직의 사용자만 조회,
// ADMIN, 전체 사용자 조회
export const getOurUsers = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>("/users");
    return response.data;
  } catch (error) {
    console.error("조직 사용자 조회(getOurUsers) error:", error);
    return {
      success: false,
      data: [],
      message: "사용자 목록을 불러오는 중 오류가 발생했습니다.",
    };
  }
};

export const approveUserStatus = async (userId: string) => {
  try {
    const response = await api.patch(`/users/approve/${userId}`);
    return response.data;
  } catch (error) {
    console.error("사용자 계정 활성화(approveUserStatus) error:", error);
    return { success: false, message: "상태 변경에 실패했습니다." };
  }
};
