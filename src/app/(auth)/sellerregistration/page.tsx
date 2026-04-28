"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AppButton from "@/components/common/AppButton";
import { createSeller } from "@/lib/apicall/authApi";
import AppFormSection from "@/components/common/AppFormSection";
import { useLoading } from "@/context/LoadingContext";
import z from "zod";
import { sellerSchema } from "@/lib/validation/sellerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
type FormData = z.infer<typeof sellerSchema>;
export default function SellerCreatePage() {
const {
  register,
  handleSubmit,
  reset,
  formState: { isSubmitting, errors },
} = useForm<FormData>({
  resolver: zodResolver(sellerSchema),
  mode: "onChange",
});
  const { setLoading } = useLoading();
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await createSeller(data);
      setLoading(false);
      toast.success("Seller created");
      reset();
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.response?.data || "Failed");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        autoComplete="off"
      >
        <AppFormSection
          title="User Detail"
          register={register}
          errors={errors}
          fields={[
            { name: "firstName", placeholder: "First Name" },
            { name: "lastName", placeholder: "Last Name" },
            { name: "email", placeholder: "Email" },
            { name: "mobile", placeholder: "Mobile" },
            { name: "password", placeholder: "Password", type: "password" },
          ]}
        />
        <AppFormSection
          title="Address Detail"
          register={register}
          errors={errors}
          fields={[
            { name: "address", placeholder: "Address" },
            { name: "city", placeholder: "City" },
            { name: "state", placeholder: "State" },
            { name: "pincode", placeholder: "Pincode" },
          ]}
        />
        <AppFormSection
          title="Business Detail"
          register={register}
          errors={errors}
          fields={[
            { name: "businessName", placeholder: "Business Name" },
            { name: "gstNumber", placeholder: "GST Number" },
            { name: "panNumber", placeholder: "PAN Number" },
          ]}
        />
        <AppFormSection
          title="Bank Detail"
          register={register}
          errors={errors}
          fields={[
            { name: "accountHolderName", placeholder: "Account Holder" },
            { name: "accountNumber", placeholder: "Account Number" },
            { name: "ifscCode", placeholder: "IFSC" },
            { name: "bankName", placeholder: "Bank Name" },
          ]}
        />
        <div className="flex justify-center">
          <AppButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Seller"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
