"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      richColors
      position="top-right"
      toastOptions={{
        style: {
          background: "#1f2937",
          color: "white",
          border: "1px solid #374151",
        },
      }}
    />
  );
}