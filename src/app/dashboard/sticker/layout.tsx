"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function StickerRootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user?.role !== "CASHIER") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
