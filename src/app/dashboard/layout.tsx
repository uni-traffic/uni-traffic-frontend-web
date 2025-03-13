import { ProtectedLayout } from "@/components/auth/protected-layout";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </SidebarProvider>
    </ProtectedLayout>
  );
}
