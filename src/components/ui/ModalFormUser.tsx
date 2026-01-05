"use client";

import { useEffect, useState } from "react";
import { AuthUser, UserRole } from "@/types/auth";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { User, UserStatus } from "@/types/user";
import { SelectorRole } from "./SelectorRole";
import { SelectorUserStatus } from "./SelectorUserStatus";
import { createUser } from "@/lib/user";

interface ModalFormUserProps {
  user: AuthUser;
  isOpen: boolean;
  mode: "create" | "edit";
  targetUser?: User;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalFormUser({
  user,
  isOpen,
  mode = "create",
  targetUser,
  onClose,
  onSuccess,
}: ModalFormUserProps) {
  const [email, setEmail] = useState(targetUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(targetUser?.name ?? "");
  const [role, setRole] = useState<UserRole>(targetUser?.role ?? "MANAGER");
  const [status, setStatus] = useState<UserStatus>(
    targetUser?.status ?? "PENDING"
  );
  const [organizationId, setOrganizationId] = useState(
    mode === "create"
      ? user.organizationId ?? ""
      : targetUser?.organizationId ?? ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = user.role === "ADMIN";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        email,
        name,
        role,
        password,
        status,
        organizationId: isAdmin ? organizationId : user.organizationId!,
      };

      if (mode === "create") {
        await createUser(payload);
      } else {
        if (!targetUser) {
          throw new Error("수정 대상 유저가 없습니다.");
        }
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "사용자 추가/수정 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && targetUser) {
        setEmail(targetUser.email);
        setName(targetUser.name);
        setRole(targetUser.role);
        setStatus(targetUser.status);
        setOrganizationId(targetUser.organizationId);
      } else {
        setEmail("");
        setName("");
        setRole("MANAGER");
        setStatus("PENDING");
        setOrganizationId(user.organizationId ?? "");
      }
    }
  }, [isOpen, mode, targetUser, user.organizationId]);

  return (
    <Modal
      title={mode === "create" ? "사용자 등록" : "사용자 수정"}
      variant="right"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col flex-1 gap-4">
          {isAdmin && (
            <div className="flex flex-col gap-1">
              <FormInput
                label="소속(회사)"
                value={organizationId}
                onChange={setOrganizationId}
                placeholder="회사명을 선택해주세요."
                disabled={isAdmin ? false : true}
              />

              <p className="text-sm text-gray-400">
                organizationId를 이용해서 특정 조직의 사용자를 추가할 수 있어요.
              </p>
            </div>
          )}
          <FormInput
            label="이메일"
            value={email}
            placeholder="이메일을 입력해주세요."
            onChange={setEmail}
            disabled={mode === "edit" ? true : false}
          />
          {mode === "create" && (
            <FormInput
              type="password"
              label="비밀번호"
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={setPassword}
            />
          )}
          <FormInput
            label="이름"
            value={name}
            placeholder="이름을 입력해주세요"
            onChange={setName}
          />
          <SelectorRole
            value={role}
            onChange={setRole}
            selectName="사용자 권한"
          />
          <SelectorUserStatus
            value={status}
            onChange={setStatus}
            selectName="계정 상태"
          />
        </div>
        <div className="flex flex-col gap-2">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" isLoading={isLoading}>
            {mode === "create" ? "등록" : "수정"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
