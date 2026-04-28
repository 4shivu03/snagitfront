"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import LogoutButton from "../../components/common/LogoutButton";
import { User, ChevronDown } from "lucide-react";
import Image from "next/image";
import AppButton from "../../components/common/AppButton";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!user) {
      setOpen(false);
    }
  }, [user]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-800 text-white px-5 py-2 flex justify-between items-center">
      <div className="flex items-center gap-1">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={40}
          className="object-contain"
        />
      </div>
      <div className="relative" ref={dropdownRef}>
        {user ? (
          <>
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer border border-white bg-white text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
            >
              <User size={18} />
              <span>{user.firstName}</span>
              <ChevronDown size={16} />
            </div>
            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg p-2">
                <div className="px-3 py-2 border-b text-sm break-all">
                  {user.email}
                </div>

                <div className="mt-2">
                  <LogoutButton
                    className="w-full text-gray-800"
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <AppButton onClick={() => (window.location.href = "/login")}>
            Login
          </AppButton>
        )}
      </div>
    </header>
  );
}
