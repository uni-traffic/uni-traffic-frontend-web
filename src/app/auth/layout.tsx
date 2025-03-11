import type { ReactNode } from "react";
import { RedirectToDashboard } from "@/components/auth/redirect-to-dashboard";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RedirectToDashboard>
      {children}
    </RedirectToDashboard>
  )
}
export default AuthLayout;