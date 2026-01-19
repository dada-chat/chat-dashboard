import { Suspense } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoadingArea from "@/components/ui/LoadingArea";
import InvitationPageContent from "./invitationPageContent";

export default function InvitationPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingArea text="초대 목록 불러오는 중..." />}>
        <InvitationPageContent />
      </Suspense>
    </DashboardLayout>
  );
}
