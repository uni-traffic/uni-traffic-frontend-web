"use client";
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard";
import { useAuth } from "@/context/auth-context";

const Dashboard = () => {
  const { user } = useAuth();

  return ["ADMIN", "SUPERADMIN"].includes(user?.role || "") ? (
    <AdminDashboard />
  ) : (
    <div className="flex size-full justify-center items-center">Coming Soon!</div>
  );
};

export default Dashboard;
