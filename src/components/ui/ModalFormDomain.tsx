"use client";

import { useMemo, useState } from "react";
import { createDomain } from "@/lib/domain";
import { AuthUser } from "@/types/auth";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { validateUrl } from "@/utils/validation";
import { VALIDATION_MESSAGES } from "@/constants/messages";

interface ModalFormDomainProps {
  user: AuthUser;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ModalFormDomain({
  user,
  isOpen,
  onClose,
  onSuccess,
}: ModalFormDomainProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = useMemo(() => {
    return validateUrl(url) && !!user.organizationId;
  }, [url, user.organizationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError("");
    setIsLoading(true);

    if (!user.organizationId) {
      setError("조직 정보가 없습니다.");
      return;
    }

    try {
      const result = await createDomain({
        domainUrl: url,
        targetOrgId: user.organizationId,
      });

      if (result.success) {
        alert("도메인이 등록되었습니다.");
        setUrl("");
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "도메인 등록 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="right"
      title="도메인 등록"
    >
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <FormInput
            label="웹사이트 url"
            type="text"
            required
            placeholder="https://example.com"
            value={url}
            onChange={setUrl}
            error={
              url && !validateUrl(url)
                ? VALIDATION_MESSAGES.URL.INVALID
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
