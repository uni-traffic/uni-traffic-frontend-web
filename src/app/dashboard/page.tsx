"use client";
import { CashierDashboard } from "@/components/cashier/CashierDashboard";
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard";
import { useAuth } from "@/context/auth-context";

const Dashboard = () => {
  const { user } = useAuth();

  return ["ADMIN", "SUPERADMIN"].includes(user?.role || "") ? (
    <AdminDashboard />
  ) : user?.role === "CASHIER" ? (
    <CashierDashboard />
  ) : (
    <div className="flex size-full justify-center items-center">Coming Soon!</div>
  );
};

export default Dashboard;
