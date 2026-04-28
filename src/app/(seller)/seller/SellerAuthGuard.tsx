"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useLoading } from "@/context/LoadingContext";

export default function SellerAuthGuard({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const { setLoading } = useLoading();
  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "S") {
      setLoading(true);
      dispatch(logout());
      setLoading(false);
      router.replace("/login");
      return;
    }
    setChecking(false);
  }, [user]);
  if (checking) return null;
  return <>{children}</>;
}
