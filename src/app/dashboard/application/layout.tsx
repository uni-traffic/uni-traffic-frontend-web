"use client";

import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function ApplicationRootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user?.role !== "SECURITY") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
