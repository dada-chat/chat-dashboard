"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SignInResponse } from "@/types/auth";
import { NAVIGATION } from "@/constants/navigation";
import { validateEmail, validatePassword } from "@/utils/validation";
import { VALIDATION_MESSAGES } from "@/constants/messages";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Touched 상태 추가
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const pwStatus = useMemo(() => validatePassword(password), [password]);
  const isPasswordValid = pwStatus.isValid;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { accessToken, user, setAuth } = useAuthStore();

  //  사용자 정보 확인
  useEffect(() => {
    if (accessToken && user) {
      router.replace(NAVIGATION.HOME);
    }
  }, [accessToken, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);
    if (!isEmailValid || !isPasswordValid) return;
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post<SignInResponse>("/auth/signin", {
        email,
        password,
      });
      const { user, accessToken } = response.data.data;

      // 전역 상태에 저장
      setAuth(user, accessToken);

      // 사용자 대시보드
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
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
            웹사이트 CS 운영을 더 쉽고 효율적으로
            <br />
            다다챗과 함께 하세요 :)
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormInput
              label="이메일"
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(value: string) => {
                setEmail(value);
                setEmailTouched(false);
              }}
              onBlur={() => setEmailTouched(true)}
              error={
                emailTouched && email && !isEmailValid
                  ? VALIDATION_MESSAGES.EMAIL.INVALID
                  : undefined
              }
            />

            <FormInput
              label="비밀번호"
              type="password"
              required
              placeholder={VALIDATION_MESSAGES.PASSWORD.REQUIRED}
              value={password}
              onChange={(value: string) => {
                setPassword(value);
                setPasswordTouched(false);
              }}
              onBlur={() => setPasswordTouched(true)}
              error={
                passwordTouched && password && !isPasswordValid
                  ? VALIDATION_MESSAGES.PASSWORD.INVALID
                  : undefined
              }
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-col gap-4">
            <Button type="submit" isLoading={isLoading}>
              로그인
            </Button>
            <Link href={NAVIGATION.SIGNUP}>
              <Button
                type="button"
                variant="none"
                size="md"
                className="!text-gray-400 !text-sm font-normal"
              >
                DadaChat이 처음이라면,
                <span className="text-gray-600 font-semibold">회원가입</span>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
