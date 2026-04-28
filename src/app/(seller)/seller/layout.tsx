"use client";

import SellerAuthGuard from "./SellerAuthGuard";

export default function SellerLayout({ children }: any) {
  return <SellerAuthGuard>{children}</SellerAuthGuard>;
}
