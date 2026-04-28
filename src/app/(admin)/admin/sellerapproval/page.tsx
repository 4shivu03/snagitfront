"use client";

import { useEffect, useState } from "react";
import AppTable from "@/components/common/AppTable";
import AppModal from "@/components/common/AppModal";
import AppInfoView from "@/components/common/AppInfoView";
import {
  getSellers,
  approveSeller,
  rejectSeller,
} from "@/lib/apicall/adminApi";
import { useLoading } from "@/context/LoadingContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rejectSchema } from "@/lib/validation/rejectSchema";
import AppTextareaField from "@/components/common/AppTextareaField";
import { toast } from "sonner";

export default function SellerApprovalPage() {
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const { setLoading } = useLoading();
  const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({ 
  resolver: zodResolver(rejectSchema),
});

  const fetch = async () => {
    setLoading(true);
    const res = await getSellers();
    setData(Array.isArray(res) ? res : res?.$values || []);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
  }, []);
  const handleApprove = async () => {
    try {
      if (!selected) return;
      setLoading(true);
      setApproveLoading(true);
      await approveSeller(selected.id);
      toast.error("Approved");
      setOpen(false);
      fetch();
    } catch (err) {
      toast.error("Error");
    } finally {
      setLoading(false);
      setApproveLoading(false);
    }
  };
  const handleReject = async (data: any) => {
  try {
    setLoading(true);
    await rejectSeller(selected.id, data.reason);
    toast.success("Rejected");
    setOpen(false);
    reset();
    fetch();
  } catch {
    toast.error("Error");
  } finally {
    setLoading(false);
  }
};
  const handleView = (row: any) => {
    setSelected(row);
    setOpen(true);
  };
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (r: any) => `${r.user.firstName} ${r.user.lastName}`,
    },
    {
      key: "email",
      label: "Email",
      render: (r: any) => r.user.email,
    },
    {
      key: "businessName",
      label: "Business",
    },
    {
      key: "status",
      label: "Status",
      render: (r: any) =>
        r.status === "A" ? (
          <span className="text-green-400">Approved</span>
        ) : r.status === "P" ? (
          <span className="text-yellow-400">Pending</span>
        ) : r.status === "R" ? (
          <span className="text-red-400">Rejected</span>
        ) : (
          <span className="text-white-400">N/A</span>
        ),
    },
    {
      key: "action",
      label: "Action",
      render: (r: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(r)}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl">
      <AppTable data={data} columns={columns} enableSearch enableSort />
      <AppModal
        open={open}
        onClose={() => setOpen(false)}
        title="Seller Details"
      >
        {selected && (
          <>
            <AppInfoView
              columns={2}
              data={[
                {
                  label: "Full Name",
                  value: `${selected.user.firstName} ${selected.user.lastName}`,
                },
                { label: "Email", value: selected.user.email },
                { label: "Mobile", value: selected.user.mobile },
                {
                  label: "User Status",
                  value:
                    selected.user.status === "A" ? (
                      <span className="text-green-400 font-semibold">
                        Approved
                      </span>
                    ) : selected.user.status === "P" ? (
                      <span className="text-yellow-400 font-semibold">
                        Pending
                      </span>
                    ) : selected.user.status === "R" ? (
                      <span className="text-red-400 font-semibold">
                        Rejected
                      </span>
                    ) : (
                      <span className="text-white-400 font-semibold">N/A</span>
                    ),
                },
                {
                  label: "Active",
                  value: selected.user.isActive ? (
                    <span className="text-green-400 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-400 font-semibold">No</span>
                  ),
                },
                { label: "Business Name", value: selected.businessName },
                { label: "GST Number", value: selected.gstNumber },
                { label: "PAN Number", value: selected.panNumber },
                {
                  label: "Full Address",
                  value: `${selected.address}, ${selected.city}, ${selected.state} - ${selected.pincode}`,
                },
                { label: "City", value: selected.city },
                { label: "State", value: selected.state },
                { label: "Pincode", value: selected.pincode },
                { label: "Bank Name", value: selected.bankName },
                { label: "Account Holder", value: selected.accountHolderName },
                {
                  label: "Account Number",
                  value: "XXXXXX" + selected.accountNumber?.slice(-4),
                },
                { label: "IFSC Code", value: selected.ifscCode },
                {
                  label: "Created On",
                  value: new Date(selected.createdDate).toLocaleString("en-IN"),
                },
              ]}
            />
            {selected.user.status === "P" && (
              <div className="mt-4 space-y-3 border-t border-gray-700 pt-4">
               <AppTextareaField
  name="reason"
  placeholder="Enter reject reason..."
  register={register}
  error={errors.reason?.message?.toString()}
  maxlength={200}
/>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={approveLoading}
                    className="bg-green-500 px-4 py-2 rounded"
                  >
                    {approveLoading ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={rejectLoading || !rejectReason}
                    className="bg-red-500 px-4 py-2 rounded"
                  >
                    {rejectLoading ? "Processing..." : "Reject"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </AppModal>
    </div>
  );
}
