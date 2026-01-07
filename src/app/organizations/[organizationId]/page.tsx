"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Organization } from "@/types/organization";
import Link from "next/link";
import NodataArea from "@/components/ui/NodataArea";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { getOrganizationById } from "@/lib/organization";
import { formatDateTime } from "@/utils/date";
import { useParams } from "next/navigation";
import { FormInput } from "@/components/ui/FormInput";

export default function OrganizationDetailPage() {
  const params = useParams();
  const organizationId = params.organizationId as string;
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [name, setName] = useState(organization?.name ?? "");

  const fetchOrganization = async () => {
    try {
      const response = await getOrganizationById(organizationId);
      if (response.success) {
        setOrganization(response.data);
      }
    } catch (error) {
      console.error("회사 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!organizationId) {
      return;
    }
    fetchOrganization();
  }, [organizationId]);

  useEffect(() => {
    if (organization) {
      setName(organization.name);
    }
  }, [organization]);

  const handleSubmit = async (e: React.FormEvent) => {};

  if (isLoading) return <div>로딩 중...</div>;

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="flex flex-col flex-1 items-center gap-4 p-6">
        <div className="flex w-120 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
            <div className="flex flex-col flex-1 gap-4">
              <FormInput
                label="회사 코드"
                value={organizationId}
                placeholder="회사 코드를 입력해주세요"
                disabled={true}
              />
              <FormInput
                label="회사명"
                value={name}
                placeholder="이름을 입력해주세요"
                onChange={setName}
              />
            </div>
            <Button type="submit" isLoading={isLoading}>
              정보 수정
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
