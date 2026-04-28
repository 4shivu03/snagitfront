"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/apicall/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

interface Props {
  className?: string;
  showIcon?: boolean;
  label?: string;
  onClick?: () => void;
}

export default function LogoutButton({
  className = "",
  showIcon = true,
  label = "Logout",
  onClick,
}: Props) {
  const router = useRouter();
  const { setLoading } = useLoading();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setLoading(false);
      toast.success("Logged out successfully");
      if (onClick) onClick();
      router.push("/login");
    } catch (err) {
      setLoading(false);
      toast.error("Logout failed");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className={`flex items-center gap-2 cursor-pointer ${className}`}
    >
      {showIcon && <LogOut size={18} />}
      {label}
    </Button>
  );
}
