"use client";

import { useState, useMemo } from "react";

type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: any) => React.ReactNode;
};
type Props = {
  data: any[];
  columns: Column[];
  enableSearch?: boolean;
  enableSort?: boolean;
};
export default function AppTable({
  data,
  columns,
  enableSearch = true,
  enableSort = true,
}: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search]);
  const sortedData = useMemo(() => {
    if (!sortKey || !enableSort) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortAsc, enableSort]);
  const handleSort = (key: string) => {
    if (!enableSort) return;
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {enableSearch && (
        <input
          type="text"
          placeholder="Search..."
          className="mb-4 p-2 w-full rounded bg-gray-700 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <div className="overflow-auto max-h-[500px]">
        <table className="w-full text-left text-white">
          <thead className="sticky top-0 bg-gray-900">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-2 cursor-pointer"
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span>{sortAsc ? " 🔼" : " 🔽"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={i} className="border-b border-gray-700">
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
