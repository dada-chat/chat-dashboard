"use client";

import { useMemo, useState } from "react";
import { createOrganization } from "@/lib/organization";
import { AuthUser } from "@/types/auth";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { validateName } from "@/utils/validation";
import { VALIDATION_MESSAGES } from "@/constants/messages";

interface ModalFormOrganizationProps {
  user: AuthUser;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalFormOrganization({
  user,
  isOpen,
  onClose,
  onSuccess,
}: ModalFormOrganizationProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = useMemo(() => {
    return validateName(name) && !!user.organizationId;
  }, [name, user.organizationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError("");
    setIsLoading(true);

    try {
      const result = await createOrganization({
        name,
      });

      if (result.success) {
        setName("");
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "회사 등록 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="right" title="회사 등록">
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <FormInput
            label="회사명"
            type="text"
            required
            placeholder={VALIDATION_MESSAGES.ORGNAME.RREQUIRED}
            value={name}
            onChange={setName}
            error={
              name && !validateName(name)
                ? VALIDATION_MESSAGES.ORGNAME.INVALID
                : undefined
            }
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button type="submit" isLoading={isLoading} disabled={!isFormValid}>
          등록
        </Button>
      </form>
    </Modal>
  );
}
