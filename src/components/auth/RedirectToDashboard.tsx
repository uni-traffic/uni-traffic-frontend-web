"use client";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

export const RedirectToDashboard = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  return <>{!isLoading && !user ? children : <LoadingScreen enableBackground={true} />}</>;
};
