"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Table } from "@/components/ui/Table";
import { getDomains, updateDomainStatus, deleteDomain } from "@/lib/domain";
import { Domain } from "@/types/domain";
import Link from "next/link";
import NodataArea from "@/components/ui/NodataArea";
import { useAuthStore } from "@/store/authStore";
import { Toggle } from "@/components/ui/Toggle";
import { ModalFormDomain } from "@/components/ui/ModalFormDomain";
import { Button } from "@/components/ui/Button";
import { CopyCheck, Copy } from "lucide-react";

export default function DomainPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchDomains = async () => {
    try {
      const response = await getDomains(); // DomainResponse
      if (response.success) {
        setDomains(response.data);
      }
    } catch (error) {
      console.error("도메인 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const handleStatusToggle = async (
    domainId: string,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;

    const result = await updateDomainStatus(domainId, newStatus);

    if (result.success) {
      alert("선택하신 도메인 상태가 변경되었습니다.");
      fetchDomains();
    } else {
      alert(result.message || "도메인 상태 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 이 도메인을 삭제하시겠습니까?")) return;

    const result = await deleteDomain(id);
    if (result.success) {
      fetchDomains(); // 목록 갱신
    }
  };

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (siteKey: string) => {
    const code = `
    <script
      src="https://dadachat-widget.lds8835.workers.dev/widget.js"
      data-dadachat-site-key="${siteKey}"
    ></script>
    `;

    await navigator.clipboard.writeText(code);
    setCopiedKey(siteKey);

    setTimeout(() => setCopiedKey(null), 1500);
  };

  if (isLoading) return <div>로딩 중...</div>;

  // 테이블 컬럼 정의
  const baseColumns = [
    {
      header: "No.",
      className: "w-16 text-center", // 너비 고정
      render: (_: Domain, index: number) => (
        <span className="text-gray-400">
          {String(index + 1).padStart(2, "0")}
        </span>
      ),
    },
    {
      header: "도메인 URL",
      render: (row: Domain) => (
        <Link
          href={row.domainUrl}
          target="_blank"
          className="text-gray-800 font-semibold hover:text-primary hover:underline"
        >
          {row.domainUrl}
        </Link>
      ),
    },
    {
      header: "위젯 설치 코드",
      render: (row: Domain) => (
        <div className="flex">
          {row.isActive ? (
            <Button
              size="sm"
              variant="none"
              onClick={() => handleCopy(row.siteKey)}
              className="!w-auto !px-0"
            >
              {copiedKey === row.siteKey ? (
                <>
                  <CopyCheck className="w-4 h-4 text-green-500" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  코드 복사
                </>
              )}
            </Button>
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      header: "상태",
      render: (row: Domain) => {
        // MANAGER가 아닌 경우(AGENT, ADMIN) 토글 렌더링
        if (user?.role === "AGENT" || user?.role === "ADMIN") {
          return (
            <div className="flex">
              <Toggle
                enabled={row.isActive}
                onChange={() => handleStatusToggle(row.id, row.isActive)}
              />
            </div>
          );
        }

        // MANAGER인 경우 읽기 전용
        return (
          <div className="flex">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                row.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {row.isActive ? "활성" : "비활성"}
            </span>
          </div>
        );
      },
    },
    {
      header: "등록일",
      render: (row: Domain) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actionColumn = {
    header: "관리",
    className: "w-24",
    render: (row: Domain) => (
      <div className="flex gap-2 w-24">
        <Button
          size="sm"
          variant="danger"
          className="!w-auto"
          onClick={() => handleDelete(row.id)}
        >
          삭제
        </Button>
      </div>
    ),
  };

  const columns =
    user?.role === "ADMIN" ? [...baseColumns, actionColumn] : baseColumns;

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 px-6">
        <div>
          <Button size="md" className="!w-auto" onClick={openModal}>
            도메인 추가
          </Button>
        </div>
        {domains.length > 0 ? (
          <Table columns={columns} data={domains} rowKey={(row) => row.id} />
        ) : (
          <NodataArea />
        )}
      </div>
      <ModalFormDomain
        user={user}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={fetchDomains}
      />
    </DashboardLayout>
  );
}
