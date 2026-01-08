import { Modal } from "./Modal";
import { Button } from "./Button";
import { Info, CircleCheckBig, OctagonAlert } from "lucide-react";
import Link from "next/link";

export type AlertIconType = "info" | "success" | "warning";
interface AlertProps {
  message: string;
  isOpen: boolean;
  iconType?: AlertIconType;
  buttonText?: string;
  nextPath?: string;
  onClose?: () => void;
}

export function Alert({
  message,
  isOpen,
  iconType = "info",
  buttonText,
  nextPath,
  onClose,
}: AlertProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="center">
      <div className="flex flex-col justify-center items-center gap-6 py-10">
        {iconType === "info" && <Info className="text-gray-300 w-12 h-12" />}
        {iconType === "success" && (
          <CircleCheckBig className="text-green-600 w-12 h-12" />
        )}
        {iconType === "warning" && (
          <OctagonAlert className="text-red-600 w-12 h-12" />
        )}
        <p className="text-center text-gray-700 whitespace-pre-wrap">
          {message}
        </p>
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
