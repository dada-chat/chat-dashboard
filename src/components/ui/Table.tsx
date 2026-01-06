import React from "react";
import { Domain } from "@/types/domain";
import { User } from "@/types/user";

// Column 정의
interface Column<T> {
  header: string;
  render: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T) => string | number;
  tableClassName?: string;
}

// Table 컴포넌트
export function Table<T>({
  columns,
  data,
  rowKey,
  tableClassName = "w-full text-sm text-left text-gray-500",
}: TableProps<T>) {
  return (
    <table className={tableClassName}>
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} rowKey={rowKey} />
    </table>
  );
}

// Header 컴포넌트
function TableHeader({
  columns,
}: {
  columns: { header: string; className?: string }[];
}) {
  return (
    <thead className="text-sm text-gray-700 uppercase bg-gray-100">
      <tr>
        {columns.map((col, idx) => (
          <th
            key={idx}
            className={`px-6 py-3 font-medium ${col.className || ""}`}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// Body 컴포넌트
function TableBody<T>({
  columns,
  data,
  rowKey,
}: {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T) => string | number;
}) {
  return (
    <tbody>
      {data.map((row, rowIdx) => (
        <tr
          key={rowKey ? rowKey(row) : rowIdx}
          className="bg-white border-b border-gray-300 hover:bg-gray-50"
        >
          {columns.map((col, colIdx) => (
            <td
              key={colIdx}
              className={`px-6 py-4 font-medium text-gray-900 ${
                col.className || ""
              }`}
            >
              {col.render(row, rowIdx)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
