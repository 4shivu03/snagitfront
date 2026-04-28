"use client";

import { createContext, useContext, useState } from "react";
import AppLoader from "@/components/common/AppLoader";

const LoadingContext = createContext<any>(null);
export const useLoading = () => useContext(LoadingContext);
export function LoadingProvider({ children }: any) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <AppLoader fullScreen />}
    </LoadingContext.Provider>
  );
}