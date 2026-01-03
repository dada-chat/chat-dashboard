import clsx from "clsx";
import Link from "next/link";
import { Button } from "./Button";
import { BookX } from "lucide-react";

export interface NodataAreaProps {
  content?: string;
  className?: string;
  linkPath?: string;
  linkText?: string;
}

export default function NodataArea({
  content = "현재 표시할 데이터가 없습니다.",
  className,
  linkPath,
  linkText,
}: NodataAreaProps) {
  const isShowLinkButton = linkPath && linkText;
  return (
    <div
      className={clsx(
        "flex  w-full items-center justify-center py-36",
        className
      )}
    >
      <div className="flex flex-col w-full items-center justify-center gap-4 lg:gap-8">
        <BookX className="h-10 w-10 text-gray-400" />
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
