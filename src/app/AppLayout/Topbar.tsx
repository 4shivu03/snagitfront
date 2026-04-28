"use client";

import { menuItems } from "@/lib/menu";
import { usePathname } from "next/navigation";

export default function Topbar({ setOpen }: any) {
  const pathname = usePathname();
  let title = "";
  menuItems.forEach((item) => {
    if (item.path === pathname) title = item.name;
    if (item.children) {
      item.children.forEach((sub) => {
        if (sub.path === pathname) title = sub.name;
      });
    }
  });

  return (
    <div className="p-4 bg-gray-900 flex items-center">
      <button className="md:hidden" onClick={() => setOpen(true)}>
        ☰
      </button>
      <div className="flex items-center justify-center flex-1">
        <h1 className="font-bold text-lg">{title}</h1>
      </div>
    </div>
  );
}
