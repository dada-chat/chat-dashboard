import clsx from "clsx";
import Link from "next/link";
import { Button } from "./Button";
import { BookX, Flag, MessageSquareX } from "lucide-react";

export interface NodataAreaProps {
  content?: string;
  className?: string;
  linkPath?: string;
  linkText?: string;
  iscenter?: boolean;
}

export default function NodataArea({
  content = "현재 표시할 데이터가 없습니다.",
  className,
  linkPath,
  linkText,
  iscenter = false,
}: NodataAreaProps) {
  const isShowLinkButton = linkPath && linkText;
  return (
    <div
      className={clsx(
        "flex w-full items-center justify-center py-36",
        className,
        iscenter && "h-full pt-0"
      )}
    >
      <div className="flex flex-col w-full items-center justify-center gap-8">
        <MessageSquareX className="h-10 w-10 text-gray-400" />
        <p className="text-sm text-gray-600">{content}</p>
        {isShowLinkButton && (
          <Link href={linkPath}>
            <Button size="md">{linkText}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
