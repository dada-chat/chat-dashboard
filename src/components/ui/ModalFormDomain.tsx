"use client";

import { useState } from "react";
import { createDomain } from "@/lib/domain";
import { User } from "@/types/auth";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { Button } from "./Button";

interface ModalFormDomainProps {
  user: User;
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

  const isValidUrl = (url: string) => {
    return /^https?:\/\//i.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user.organizationId) {
      setError("조직 정보가 없습니다.");
      return;
    }

    if (!isValidUrl(url.trim())) {
      setError("http:// 또는 https:// 로 시작하는 URL을 입력해주세요.");
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
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button type="submit" isLoading={isLoading}>
          등록
        </Button>
      </form>
    </Modal>
  );
}
