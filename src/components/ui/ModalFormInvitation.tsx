"use client";

import { useEffect, useState } from "react";
import { AuthUser, UserRole } from "@/types/auth";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { SelectorRole } from "./SelectorRole";
import { createInvitation } from "@/lib/invitation";

interface ModalFormInvitationProps {
  user: AuthUser;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalFormInvitation({
  user,
  isOpen,
  onClose,
  onSuccess,
}: ModalFormInvitationProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("MANAGER");

  const [organizationId, setOrganizationId] = useState(
    user.role === "ADMIN" ? user.organizationId : ""
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
        organizationId: isAdmin ? organizationId : user.organizationId!,
      };
      await createInvitation(payload);

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
      setEmail("");
      setName("");
      setRole("MANAGER");
      setOrganizationId(user.organizationId ?? "");
    }
  }, [isOpen, user.organizationId]);

  return (
    <Modal title="초대 정보" variant="right" isOpen={isOpen} onClose={onClose}>
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

              <p className="text-xs text-gray-400">
                *organizationId를 이용해서, 해당 조직의 초대장을 보낼 수
                있습니다.
              </p>
            </div>
          )}
          <FormInput
            label="이메일"
            value={email}
            placeholder="이메일을 입력해주세요."
            onChange={setEmail}
          />

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
            currentUserRole={user.role}
          />
        </div>
        <div className="flex flex-col gap-2">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" isLoading={isLoading}>
            메일 보내기
          </Button>
        </div>
      </form>
    </Modal>
  );
}
