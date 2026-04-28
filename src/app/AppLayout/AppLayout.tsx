"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AppLayout({ children }: any) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    );
  }
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <Sidebar open={open} setOpen={setOpen} />
      <div className="ml-0 md:ml-64 min-h-screen flex flex-col">
        <Topbar setOpen={setOpen} />
        <div className="p-4 md:p-6 flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
