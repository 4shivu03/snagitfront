"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { menuItems } from "@/lib/menu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Sidebar({ open, setOpen }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const filteredMenu = menuItems
    .map((item) => {
      if (!item.children) {
       if (!item.roles?.includes(user?.role ?? "")) return null;
        return item;
      }
      const filteredChildren = item.children.filter((child) =>
        child.roles?.includes(user?.role ?? "")
      );
      if (filteredChildren.length === 0) return null;
      return {
        ...item,
        children: filteredChildren,
      };
    })
    .filter(Boolean);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`bg-gray-800 p-4 space-y-2
  fixed top-14 left-0 z-50 h-[calc(100vh-56px)] w-64
  transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0`}
      >
        {filteredMenu.map((item: any, index: number) => {
          const Icon = item.icon;
          const isParentOpen =
            item.children?.some((c: any) => pathname === c.path) || false;
          if (!item.children) {
            const isActive = pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-2 p-2 rounded text-left
                  ${
                    isActive
                      ? "bg-white text-gray-900"
                      : "hover:bg-gray-700 text-white"
                  }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
            );
          }
          return (
            <div key={index}>
              <button
                onClick={() =>
                  setOpenMenu(openMenu === item.name ? null : item.name)
                }
                className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-700 text-white"
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} />
                  <span>{item.name}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition ${
                    openMenu === item.name || isParentOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {(openMenu === item.name || isParentOpen) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((sub: any, i: number) => {
                    const SubIcon = sub.icon;
                    const isActive = pathname === sub.path;
                    return (
                      <button
                        key={i}
                        onClick={() => router.push(sub.path)}
                        className={`w-full flex items-center gap-2 p-2 rounded text-left
                          ${
                            isActive
                              ? "bg-white text-gray-900"
                              : "hover:bg-gray-700 text-gray-300"
                          }`}
                      >
                        <SubIcon size={16} />
                        <span>{sub.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}
