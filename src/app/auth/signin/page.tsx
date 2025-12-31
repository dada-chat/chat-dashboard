"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SignInResponse } from "@/types/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      // 대시보드 > 채팅페이지로 이동
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
              onChange={setEmail}
            />

            <FormInput
              label="비밀번호"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <Button type="submit" isLoading={isLoading}>
              로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
