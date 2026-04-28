"use client";

import AuthGuard from "./AuthGuard";

export default function AdminLayout({ children }: any) {
  return <AuthGuard>{children}</AuthGuard>;
}
