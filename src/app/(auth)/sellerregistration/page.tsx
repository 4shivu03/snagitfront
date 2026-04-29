"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AppButton from "@/components/common/AppButton";
import { createSeller } from "@/lib/apicall/authApi";
import AppFormSection from "@/components/common/AppFormSection";
import { useLoading } from "@/context/LoadingContext";
import { z } from "zod";
import { sellerSchema } from "@/lib/validation/sellerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Building2,
  CreditCard,
} from "lucide-react";

type FormData = z.infer<typeof sellerSchema>;

export default function SellerCreatePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(sellerSchema),
  });

  const { setLoading } = useLoading();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await createSeller(data);
      toast.success("Seller created successfully");
      reset();
    } catch (err: any) {
      toast.error(err?.response?.data || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 p-6">
      <div className="max-w-5xl mx-auto bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Create Seller Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="off"
        >
          {/* USER */}
          <AppFormSection
            title="User Details"
            register={register}
            errors={errors}
            fields={[
              { name: "firstName", placeholder: "First Name", icon: User },
              { name: "lastName", placeholder: "Last Name", icon: User },
              { name: "email", placeholder: "Email", type: "email", icon: Mail },
              { name: "mobile", placeholder: "Mobile", type: "tel", icon: Phone },
              {
                name: "password",
                placeholder: "Password",
                type: "password",
                icon: Lock,
              },
            ]}
          />

          {/* ADDRESS */}
          <AppFormSection
            title="Address Details"
            register={register}
            errors={errors}
            fields={[
              { name: "address", placeholder: "Address", icon: MapPin },
              { name: "city", placeholder: "City", icon: MapPin },
              { name: "state", placeholder: "State", icon: MapPin },
              { name: "pincode", placeholder: "Pincode", icon: MapPin },
            ]}
          />

          {/* BUSINESS */}
          <AppFormSection
            title="Business Details"
            register={register}
            errors={errors}
            fields={[
              {
                name: "businessName",
                placeholder: "Business Name",
                icon: Building2,
              },
              { name: "gstNumber", placeholder: "GST Number",icon: Building2, },
              { name: "panNumber", placeholder: "PAN Number",icon: Building2, },
            ]}
          />

          {/* BANK */}
          <AppFormSection
            title="Bank Details"
            register={register}
            errors={errors}
            fields={[
              {
                name: "accountHolderName",
                placeholder: "Account Holder",
                icon: CreditCard,
              },
              {
                name: "accountNumber",
                placeholder: "Account Number",
                icon: CreditCard,
              },
              { name: "ifscCode", placeholder: "IFSC Code",icon: CreditCard, },
              { name: "bankName", placeholder: "Bank Name",icon: CreditCard, },
            ]}
          />

          {/* BUTTON */}
         <div className="flex justify-center"> <AppButton type="submit" disabled={isSubmitting}> {isSubmitting ? "Creating..." : "Create Seller"} </AppButton> </div>
        </form>
      </div>
    </div>
  );
}