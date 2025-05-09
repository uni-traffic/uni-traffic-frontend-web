"use client";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { CashierDashboard } from "@/components/dashboard/CashierDashboard";
import { SecurityDashboard } from "@/components/dashboard/SecurityDashboard";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return ["ADMIN", "SUPERADMIN"].includes(user?.role || "") ? (
    <AdminDashboard />
  ) : user?.role === "CASHIER" ? (
    <CashierDashboard />
  ) : user?.role === "SECURITY" ? (
    <SecurityDashboard />
  ) : (
    <div className="flex size-full justify-center items-center">Coming Soon!</div>
  );
};

export default Dashboard;
