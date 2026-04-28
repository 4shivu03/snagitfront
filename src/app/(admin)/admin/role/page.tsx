"use client";

import { useEffect, useState } from "react";
import {
  getRoles,
  addRole,
  toggleRoleStatus,
} from "@/lib/apicall/adminApi";
import AppTable from "@/components/common/AppTable";
import AppButton from "@/components/common/AppButton";
import AppModal from "@/components/common/AppModal";
import ToggleButton from "@/components/common/ToggleButton";
import AppFormField from "@/components/common/AppFormField";
import { useLoading } from "@/context/LoadingContext";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema } from "@/lib/validation/roleSchema";
import { z } from "zod";
import { User, Key } from "lucide-react";

type FormData = z.infer<typeof roleSchema>;

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { setLoading } = useLoading();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(roleSchema),
    mode: "onChange",
  });
  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      const finalData = Array.isArray(data) ? data : data?.$values || [];
      setRoles(finalData);
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await addRole(data);
      toast.success("Role added");
      reset();
      setOpenModal(false);
      fetchRoles();
    } catch (err: any) {
      toast.error(err?.response?.data || "Failed");
    } finally {
      setLoading(false);
    }
  };
  const handleToggle = async (id: number) => {
    try {
      setLoading(true);
      await toggleRoleStatus(id);
      fetchRoles();
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "roleName", label: "Name", sortable: true },
    { key: "roleCode", label: "Code", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (r: any) =>
        r.isActive ? (
          <span className="text-green-400">Active</span>
        ) : (
          <span className="text-red-400">Inactive</span>
        ),
    },
    {
      key: "action",
      label: "Action",
      render: (u: any) =>
        u.roleCode !== "A" ? (
          <ToggleButton
            isActive={u.isActive}
            onClick={() => handleToggle(u.id)}
          />
        ) : (
          <span className="text-gray-400">N/A</span>
        ),
    },
  ];

  return (
    <>
      <AppButton
        onClick={() => setOpenModal(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-600"
      >
        Add Role
      </AppButton>
      <AppTable
        data={roles}
        columns={columns}
        enableSearch
        enableSort
      />
      <AppModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Add Role"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          <AppFormField
            name="roleName"
            placeholder="Role Name"
            register={register}
            error={errors.roleName?.message?.toString()}
            icon={User}
          />
          <AppFormField
            name="roleCode"
            placeholder="Role Code (e.g. A, S)"
            register={register}
            error={errors.roleCode?.message?.toString()}
            icon={Key}
            maxlength={5}
          />
          <AppButton
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </AppButton>
        </form>
      </AppModal>
    </>
  );
}