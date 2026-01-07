"use client";

import { useState } from "react";
import { createDomain } from "@/lib/domain";
import { AuthUser } from "@/types/auth";
import { Modal } from "./Modal";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { CircleAlert, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface AlertProps {
  message: string;
  isOpen: boolean;
  buttonText?: string;
  nextPath?: string;
  onClose?: () => void;
}

export function Alert({
  message,
  isOpen,
  buttonText,
  nextPath,
  onClose,
}: AlertProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="center">
      <div className="flex flex-col justify-center items-center gap-6 py-10">
        <ShieldAlert className="text-red-600 w-12 h-12" />
        <p className="text-gray-700">{message}</p>
      </div>
      {nextPath && (
        <Link href={nextPath} className="flex w-full">
          <Button variant="dark">
            {buttonText ? buttonText : "홈으로 이동"}
          </Button>
        </Link>
      )}
      {onClose && (
        <Button onClick={onClose}>{buttonText ? buttonText : "확인"}</Button>
      )}
    </Modal>
  );
}
