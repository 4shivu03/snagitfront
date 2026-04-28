"use client";

import { useEffect, useState } from "react";
import {
  getDashboard,
  getUserGrowth,
  getRoleStats,
} from "@/lib/apicall/adminApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useLoading } from "@/context/LoadingContext";
import { toast } from "sonner";

export default function Dashboard() {
  const [stats, setStats] = useState<any>({});
  const [growth, setGrowth] = useState<any[]>([]);
  const [roleStats, setRoleStats] = useState<any[]>([]);
  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];
  const { setLoading } = useLoading();
  const fetchData = async () => {
    try {
      setLoading(true);
      const dashboardData = await getDashboard();
      setStats(dashboardData);
      const growthData = await getUserGrowth();
      setGrowth(growthData);
      const roleData = await getRoleStats();
      const formatted = roleData.map((r: any) => ({
        name:
          r.role === "A" ? "Admin" : r.role === "S" ? "Seller" : "Purchaser",
        value: r.count,
      }));
      setRoleStats(formatted);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Failed");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <Card
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-800"
        />
        <Card
          title="Total Sellers"
          value={stats.totalSellers}
          color="bg-purple-800"
        />
        <Card
          title="Total Purchasers"
          value={stats.totalPurchasers}
          color="bg-indigo-800"
        />
        <Card
          title="Approved Users"
          value={stats.approvedUsers}
          color="bg-green-800"
        />
        <Card
          title="Pending Users"
          value={stats.pendingUsers}
          color="bg-yellow-800"
        />
        <Card
          title="Rejected Users"
          value={stats.rejectedUsers}
          color="bg-red-800"
        />
        <Card
          title="Active Users"
          value={stats.activeUsers}
          color="bg-emerald-800"
        />
        <Card
          title="Deactivated Users"
          value={stats.deactivatedUsers}
          color="bg-pink-800"
        />
        <Card
          title="Active Users (7d)"
          value={stats.last7DaysActive}
          color="bg-cyan-800"
        />
      </div>
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-lg font-bold mb-4 text-white">
          User Growth (Last 7 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-4 text-white">
            Users by Role (Bar)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-4 text-white">
            Role Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleStats}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {roleStats.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
type Props = {
  title: string;
  value: number;
  color?: string;
};

export function Card({ title, value, color = "bg-gray-800" }: Props) {
  return (
    <div className={`${color} p-4 rounded-xl shadow-md`}>
      <h3 className="text-gray-300 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
