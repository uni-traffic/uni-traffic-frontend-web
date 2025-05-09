import { RedirectToDashboard } from "@/components/auth/RedirectToDashboard";
import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <RedirectToDashboard>{children}</RedirectToDashboard>;
};
export default AuthLayout;
