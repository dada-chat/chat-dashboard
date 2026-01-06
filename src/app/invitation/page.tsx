"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import Link from "next/link";
import NodataArea from "@/components/ui/NodataArea";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { getInvitations } from "@/lib/invitation";
import clsx from "clsx";
import { USER_ROLE } from "@/constants/user";
import { CircleCheckBig, Mail } from "lucide-react";
import { Invitation, GetInvitationsParams } from "@/types/invitation";
import { ModalFormInvitation } from "@/components/ui/ModalFormInvitation";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FilterInvitationStatus } from "@/components/ui/FilterInvitationStatus";

export default function DomainPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL에서 파라미터 추출
  const orgId = searchParams.get("organizationId") || undefined;
  const status =
    (searchParams.get("status") as GetInvitationsParams["status"]) || undefined;
  const currentParams = useMemo(
    () => ({
      organizationId: orgId,
      status: status,
    }),
    [orgId, status]
  );

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const closeModal = () => setIsModalOpen(false);
  const [selectedInvitation, setSelectedInvitation] = useState<
    Invitation | undefined
  >(undefined);

  const fetchInvitations = async (params: GetInvitationsParams) => {
    try {
      setIsLoading(true);
      const response = await getInvitations(params);
      if (response.success) {
        setInvitations(response.data);
      }
    } catch (error) {
      console.error("초대 목록 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newParams: GetInvitationsParams) => {
    const params = new URLSearchParams();
    if (newParams.organizationId)
      params.set("organizationId", newParams.organizationId);
    if (newParams.status) params.set("status", newParams.status);

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetchInvitations(currentParams);
  }, [orgId, status]);

  const handleCreateClick = () => {
    setModalMode("create");
    setSelectedInvitation(undefined);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>로딩 중...</div>;

  // 테이블 컬럼 정의
  const baseColumns = [
    {
      header: "이메일",
      render: (row: Invitation) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">{row.email}</span>
        </div>
      ),
    },
    {
      header: "이름",
      className: "w-20",
      render: (row: Invitation) => (
        <div className="w-28 truncate">
          <span className="text-gray-800 ">{row.name}</span>
        </div>
      ),
    },
    {
      header: "권한",
      className: "w-20",
      render: (row: Invitation) => {
        const role = row.role;

        return (
          <div
            className={clsx(
              "w-20",
              row.role === "ADMIN"
                ? "text-red-700 font-semibold"
                : "text-gray-600"
            )}
          >
            <span>{USER_ROLE[role].label}</span>
          </div>
        );
      },
    },
    {
      header: "초대 상태",
      className: "w-40",
      render: (row: Invitation) => (
        <div className="flex gap-2 items-center">
          {row.isAccepted ? (
            <>
              <CircleCheckBig className="w-4 h-4 text-green-500" />
              <span className=" font-semibold">가입 완료</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 font-medium">가입 전</span>
            </>
          )}
        </div>
      ),
    },
    {
      header: "생성일",
      render: (row: Invitation) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const adminColumn = {
    header: "소속(회사)",
    className: "w-32",
    render: (row: Invitation) => (
      <div className="w-32 truncate">
        {row.organization ? (
          <Link
            href={`/invitation?organizationId=${row.organizationId}`}
            className="text-gray-800 font-semibold hover:text-primary hover:underline"
          >
            {row.organization?.name}
          </Link>
        ) : (
          <span>-</span>
        )}
      </div>
    ),
  };

  const columns =
    user?.role === "ADMIN" ? [adminColumn, ...baseColumns] : baseColumns;

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 px-6">
        <div className="flex justify-between items-center">
          <div>
            {user?.role === "ADMIN" && (
              <Button size="md" className="!w-auto" onClick={handleCreateClick}>
                초대장 보내기
              </Button>
            )}
          </div>
          <div>
            <FilterInvitationStatus
              size="md"
              currentParams={currentParams}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        {invitations.length > 0 ? (
          <Table
            columns={columns}
            data={invitations}
            rowKey={(row) => row.id}
          />
        ) : (
          <NodataArea />
        )}
      </div>
      {isModalOpen && (
        <ModalFormInvitation
          user={user}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={() => {
            fetchInvitations(currentParams);
            setIsModalOpen(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}
