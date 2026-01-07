"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import { Organization } from "@/types/organization";
import Link from "next/link";
import NodataArea from "@/components/ui/NodataArea";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { getOrganizations } from "@/lib/organization";
import { formatDateTime } from "@/utils/date";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrganizationListPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchOurUsers = async () => {
    try {
      const response = await getOrganizations();
      if (response.success) {
        setOrganizations(response.data);
      }
    } catch (error) {
      console.error("회사 목록 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!user) return;

    // 어드민이 아니면 organizationId 상세페이지
    if (user.role !== "ADMIN") {
      router.replace(`/organizations/${user.organizationId}`);
    }
  }, [user, router]);

  useEffect(() => {
    fetchOurUsers();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;

  // 테이블 컬럼 정의
  const baseColumns = [
    {
      header: "회사명",
      className: "w-36",
      render: (row: Organization) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">{row.name}</span>
        </div>
      ),
    },
    {
      header: "회사 코드",
      render: (row: Organization) => (
        <div className="flex">
          <span className="text-gray-800">{row.id}</span>
        </div>
      ),
    },
    {
      header: "사용 인원",
      className: "w-28",
      render: (row: Organization) => (
        <div className="text-gray-600">
          <span>{row._count?.users}명</span>
        </div>
      ),
    },
    {
      header: "등록 도메인",
      className: "w-28",
      render: (row: Organization) => (
        <div className="text-gray-600">
          <span>{row._count?.domains}개</span>
        </div>
      ),
    },
    {
      header: "생성일",
      render: (row: Organization) => formatDateTime(row.createdAt),
    },
    {
      header: "관리",
      className: "w-24",
      render: (row: Organization) => (
        <div className="flex gap-2 w-24">
          <Link href={`/organizations/${row.id}`}>
            <Button
              variant="none"
              size="sm"
              className="!px-0 !gap-0.5 !w-auto hover:!text-primary hover:underline"
            >
              상세보기 <ChevronRight className="w-4 h-4 text-primary" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 px-6">
        <div>
          {user?.role === "ADMIN" && (
            <Button size="md" className="!w-auto" onClick={handleCreateClick}>
              회사 추가
            </Button>
          )}
        </div>
        {organizations.length > 0 ? (
          <Table
            columns={baseColumns}
            data={organizations}
            rowKey={(row) => row.id}
          />
        ) : (
          <NodataArea />
        )}
      </div>
    </DashboardLayout>
  );
}
