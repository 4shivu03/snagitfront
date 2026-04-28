"use client";

import { getAllUsers, toggleUserStatus } from "@/lib/apicall/adminApi";
import { useEffect, useState } from "react";
import AppTable from "@/components/common/AppTable";
import ToggleButton from "@/components/common/ToggleButton";
import { useLoading } from "@/context/LoadingContext";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading1, setLoading1] = useState(true);
    const { setLoading } = useLoading();
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsers();
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data.$values) {
        setUsers(data.$values);
      } else {
        setUsers([]);
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      toast.error("Failed");
    } finally {
      setLoading(false)
      setLoading1(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleToggle = async (id: number) => {
    try {
      await toggleUserStatus(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };
  if (loading1) return <div className="p-6 text-white">Loading...</div>;
  const columns = [
    { key: "id", label: "ID", sortable: true },
    {
      key: "name",
      label: "Name",
      render: (u: any) => `${u.firstName} ${u.lastName}`,
    },
    { key: "email", label: "Email", sortable: true },
    { key: "mobile", label: "Mobile", sortable: true },
    {
      key: "role",
      label: "Role",
      render: (u: any) =>
        u.role === "A"
          ? "Admin"
          : u.role === "S"
          ? "Seller"
          : "Purchaser",
           sortable: true
    },
{
      key: "approvalstatus",
      label: "Approval Status",
      render: (u: any) =>
        u.status === "A"
          ? <span className="text-green-400">Approved</span>
          : u.status === "P"
          ? <span className="text-yellow-400">Pending</span>
          :u.status === "R"
          ? <span className="text-red-400">Rejected</span>
          : <span className="text-white-400">N/A</span>,
           sortable: true
    },
    {
      key: "activestatus",
      label: "Active Status",
      render: (u: any) =>
        u.isActive ? (
          <span className="text-green-400">Active</span>
        ) : (
          <span className="text-red-400">Inactive</span>
        ),
         sortable: true
    },
    {
      key: "createdDate",
      label: "Created Date",
      render: (u: any) =>
        new Date(u.createdDate).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
         sortable: true
    },
    {
      key: "action",
      label: "Action",
      render: (u: any) =>
        (u.role !== "A" && u.status==="A")? (
          <ToggleButton
        isActive={u.isActive}
        onClick={() => handleToggle(u.id)}
      />
        ): (
          <span className="text-gray-400 text-sm">N/A</span>
        ),
    },
  ];

  return (
      <AppTable
        data={users}
        columns={columns}
        enableSearch={true}
        enableSort={true}
      />
  );
}