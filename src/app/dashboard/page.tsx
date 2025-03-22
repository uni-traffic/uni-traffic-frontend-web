"use client";
import { CashierDashboard } from "@/components/cashier/cashier-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard";
import { useAuth } from "@/context/auth-context";
import { SecurityDashboard } from "@/components/dashboard/applications/security-dashboard";

const Dashboard = () => {
  const { user } = useAuth();

  return ["ADMIN", "SUPERADMIN"].includes(user?.role || "") ? (
    <AdminDashboard />
  ) : user?.role === "CASHIER" ? (
    <CashierDashboard />
  ) : user?.role === "SECURITY" ? (
    <SecurityDashboard/>
  ) : (
    <div className="flex size-full justify-center items-center">Coming Soon!</div>
  );
};

export default Dashboard;
