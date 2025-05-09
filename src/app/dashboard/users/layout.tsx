"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function UsersRootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user?.role !== "ADMIN" && user?.role !== "SUPERADMIN") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
