import { Suspense } from "react";
import SignUpForm from "./signupForm";
import LoadingArea from "@/components/ui/LoadingArea";

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoadingArea text="페이지를 불러오는 중..." />
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
