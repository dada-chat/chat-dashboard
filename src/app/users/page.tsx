"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import { User } from "@/types/user";
import Link from "next/link";
import NodataArea from "@/components/ui/NodataArea";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { getOurUsers, approveUserStatus } from "@/lib/user";
import { UserStatusBadge } from "@/components/ui/UserStatus";
import clsx from "clsx";
import { USER_ROLE } from "@/constants/user";
import { PencilLine } from "lucide-react";
import { ModalFormUser } from "@/components/ui/ModalFormUser";

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const closeModal = () => setIsModalOpen(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const fetchOurUsers = async () => {
    try {
      const response = await getOurUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("사용자 목록 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOurUsers();
  }, []);

  const handleApproveUserStatus = async (userId: string) => {
    const result = await approveUserStatus(userId);

    if (result.success) {
      alert("선택하신 계정이 활성화되었습니다.");
      fetchOurUsers();
    } else {
      alert(
        result.message || "계정을 활성화하는 과정에서 오류가 발생했습니다."
      );
    }
  };

  const handleCreateClick = () => {
    setModalMode("create");
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  // 수정 버튼 클릭 시 (테이블 내부 버튼)
  const handleEditClick = (user: User) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>로딩 중...</div>;

  // 테이블 컬럼 정의
  const baseColumns = [
    {
      header: "이메일",
      render: (row: User) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">{row.email}</span>
          {(user?.role === "AGENT" || user?.role === "ADMIN") && (
            <Button
              variant="none"
              size="sm"
              className="!px-1 !w-auto hover:text-primary"
              onClick={() => handleEditClick(row)}
            >
              <PencilLine className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
    {
      header: "이름",
      className: "w-20",
      render: (row: User) => (
        <div className="w-28 truncate">
          <span className="text-gray-800 ">{row.name}</span>
        </div>
      ),
    },

    {
      header: "권한",
      className: "w-20",
      render: (row: User) => {
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
      header: "계정 상태",
      className: "w-40",
      render: (row: User) => (
        <div className="flex gap-2">
          <UserStatusBadge status={row.status} />
          {(user?.role === "AGENT" || user?.role === "ADMIN") &&
            row.status === "PENDING" && (
              <Button
                size="sm"
                className="!w-auto !px-1.5 !text-sm !bg-green-600 !hover:bg-green-700"
                onClick={() => handleApproveUserStatus(row.id)}
              >
                활성화
              </Button>
            )}
        </div>
      ),
    },
    {
      header: "생성일",
      render: (row: User) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const adminColumn = {
    header: "소속(회사)",
    className: "w-32",
    render: (row: User) => (
      <div className="w-32 truncate">
        {row.organization ? (
          <Link
            href={`/organizations/users?orgId=${row.organizationId}`}
            target="_blank"
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
        <div>
          {(user?.role === "ADMIN" || user?.role === "AGENT") && (
            <Button size="md" className="!w-auto" onClick={handleCreateClick}>
              사용자 추가
            </Button>
          )}
        </div>
        {users.length > 0 ? (
          <Table columns={columns} data={users} rowKey={(row) => row.id} />
        ) : (
          <NodataArea />
        )}
      </div>
      {isModalOpen && (
        <ModalFormUser
          user={user}
          isOpen={isModalOpen}
          mode={modalMode}
          targetUser={selectedUser}
          onClose={closeModal}
          onSuccess={() => {
            fetchOurUsers();
            setIsModalOpen(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}
