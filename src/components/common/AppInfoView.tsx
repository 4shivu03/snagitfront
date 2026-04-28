"use client";

type Item = {
  label: string;
  value: any;
};

type Props = {
  data: Item[];
  columns?: number;
};

export default function AppInfoView({ data, columns = 2 }: Props) {
  return (
    <div
      className={`grid gap-4 ${
        columns === 1
          ? "grid-cols-1"
          : columns === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
      }`}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-gray-500 transition"
        >
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            {item.label}
          </p>
          <p className="text-white font-medium mt-1 break-words">
            {item.value || "-"}
          </p>
        </div>
      ))}
    </div>
  );
}
