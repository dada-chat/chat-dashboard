import { ReactNode } from "react";

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

export default function InfoItem({ icon, label, children }: InfoItemProps) {
  return (
    <div className="flex gap-2 py-2.5 px-4 items-center bg-gray-100 rounded-lg">
      <div className="w-4 h-4">{icon}</div>

      <div className="flex flex-col gap-0.5 text-sm min-w-0">
        <span className="text-xs text-gray-600">{label}</span>
        <p className="text-gray-800 flex w-full gap-1 truncate min-w-0">
          {children}
        </p>
      </div>
    </div>
  );
}
