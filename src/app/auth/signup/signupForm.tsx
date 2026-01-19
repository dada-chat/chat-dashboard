"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { NAVIGATION } from "@/constants/navigation";
import { getInvitationById } from "@/lib/invitation";
import { Alert, AlertIconType } from "@/components/ui/Alert";
import { signUpAsAgentWithOrganization, signUpByInvitation } from "@/lib/auth";
import { UserRole } from "@/types/auth";
import { USER_ROLE } from "@/constants/user";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validation";
import { VALIDATION_MESSAGES } from "@/constants/messages";
import Link from "next/link";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitationId");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("MANAGER");
  const [organizationId, setOrganizationId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [systemMessage, setSystemMessage] = useState("");
  const [systemMessageIcon, setSystemMessageIcon] =
    useState<AlertIconType>("info");

  const router = useRouter();
  const { accessToken, user } = useAuthStore();

  //  로그인 정보 확인
  useEffect(() => {
    if (accessToken && user) {
      router.replace(NAVIGATION.HOME);
    }
  }, [accessToken, user, router]);

  useEffect(() => {
    if (!invitationId) {
      return;
    }

    const fetchInvitation = async () => {
      try {
        setIsLoading(true);
        const response = await getInvitationById(invitationId);

        if (!response.success) {
          setSystemMessageIcon("warning");
          setSystemMessage(
            response.message || "유효하지 않은 초대 링크입니다."
          );
          return;
        }

        if (response.success && response.data) {
          setEmail(response.data?.email);
          setName(response.data?.name);
          setRole(response.data?.role);
          setOrganizationId(response.data?.organizationId);
          setOrganizationName(response.data?.organization?.name || "");
        }
      } catch (error) {
        console.error("유효한 초대 정보 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitation();
  }, [invitationId]);

  const isEmailValid = validateEmail(email);
  const isNameValid = validateName(name);

  const pwStatus = useMemo(() => validatePassword(password), [password]);
  const isPasswordValid = pwStatus.isValid;
  const isPasswordMatch = password.length > 0 && password === passwordConfirm;

  // 전체 유효성 판단
  const isFormValid = useMemo(() => {
    const commonFields =
      isEmailValid &&
      isNameValid &&
      isPasswordValid &&
      isPasswordMatch &&
      organizationName.trim().length > 0;

    return invitationId ? commonFields && organizationId : commonFields;
  }, [
    isEmailValid,
    isNameValid,
    isPasswordValid,
    isPasswordMatch,
    organizationName,
    organizationId,
    invitationId,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);
    setError("");

    try {
      if (!invitationId) {
        // 일반 회원가입
        const payload = {
          email,
          password,
          name,
          organizationName,
        };

        const response = await signUpAsAgentWithOrganization(payload);

        if (response.success) {
          setSystemMessageIcon("success");
          setSystemMessage(
            "회원가입이 완료되었습니다.\n다다챗 관리자의 승인 이후 서비스 이용이 가능합니다."
          );
        } else {
          setSystemMessageIcon("warning");
          setSystemMessage(
            response.message ||
              "회원가입 중 오류가 발생했습니다.\n잠시 후 다시 시도해 보세요 :("
          );
        }
      } else {
        // 초대 회원가입
        const payload = {
          email,
          password,
          name,
          role,
          organizationId,
          organizationName,
          invitationId,
        };

        const response = await signUpByInvitation(payload);

        if (response.success) {
          setSystemMessageIcon("success");
          setSystemMessage(
            `${organizationName} 소속으로, 다다챗 회원가입이 완료되었습니다.\n로그인 후 다다챗을 이용해 보세요!`
          );
        } else {
          setSystemMessageIcon("warning");
          setSystemMessage(
            response.message ||
              "초대를 통한 회원가입 중 오류가 발생했습니다.\n잠시 후 다시 시도해 보세요 :("
          );
        }
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen py-10 items-center justify-center bg-gray-100">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-md">
          <div className="text-center flex flex-col gap-2 items-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              <span className="sr-only">DadaChat 대시보드</span>
              <Image
                src="/images/logo.svg"
                alt="DadaChat logo"
                width={206}
                height={48}
              />
            </h2>
            <p className="text-sm text-gray-500">
              {invitationId ? (
                <>
                  초대 메일을 통해&nbsp;
                  <span className="text-gray-700 font-bold">
                    {organizationName}
                  </span>
                  &nbsp;소속의
                  <br />
                  <span className="text-gray-700 font-bold">
                    {USER_ROLE[role].label}
                  </span>
                  &nbsp;권한으로 회원가입이 진행됩니다.
                </>
              ) : (
                <>
                  웹사이트 CS 운영을 더 쉽고 효율적으로
                  <br />
                  다다챗과 함께 하세요 :&#41;
                </>
              )}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 border-b border-gray-300 pb-4">
                <FormInput
                  label="회사명"
                  type="text"
                  required
                  placeholder="회사명을 입력해주세요."
                  value={organizationName}
                  onChange={setOrganizationName}
                  disabled={invitationId ? true : false}
                />
                {invitationId && (
                  <FormInput
                    label="회사 코드"
                    type="text"
                    required
                    placeholder="회사코드를 입력해주세요."
                    value={organizationId}
                    onChange={setOrganizationId}
                    disabled={true}
                  />
                )}
              </div>
              <FormInput
                label="이메일"
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={setEmail}
                disabled={invitationId ? true : false}
                error={
                  email && !isEmailValid
                    ? VALIDATION_MESSAGES.EMAIL.INVALID
                    : undefined
                }
              />
              <FormInput
                label="이름"
                type="text"
                required
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={setName}
                error={
                  name && !isNameValid
                    ? VALIDATION_MESSAGES.USERNAME.INVALID
                    : undefined
                }
              />
              <FormInput
                label="비밀번호"
                type="password"
                required
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={setPassword}
                error={
                  password && !isPasswordValid
                    ? VALIDATION_MESSAGES.PASSWORD.INVALID
                    : undefined
                }
              />
              <FormInput
                label="비밀번호 재확인"
                type="password"
                required
                placeholder="비밀번호를 다시 한번 입력해주세요."
                value={passwordConfirm}
                onChange={setPasswordConfirm}
                error={
                  passwordConfirm && !isPasswordMatch
                    ? "비밀번호가 일치하지 않습니다."
                    : undefined
                }
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={!isFormValid}
                isLoading={isLoading}
              >
                회원가입
              </Button>
              <Link href={NAVIGATION.SIGNIN}>
                <Button
                  type="button"
                  variant="none"
                  size="md"
                  className="!text-gray-400 !text-sm font-normal"
                >
                  이미 계정이 있다면,
                  <span className="text-gray-600 font-semibold">로그인</span>
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {systemMessage && (
        <Alert
          message={systemMessage}
          isOpen={true}
          iconType={systemMessageIcon}
          nextPath="/"
          buttonText={systemMessageIcon === "success" ? "로그인" : ""}
        />
      )}
    </>
  );
}
