"use client";

import { useForm } from "react-hook-form";
import { addProduct } from "@/lib/apicall/sellerApi";
import { toast } from "sonner";
import AppFormSection from "@/components/common/AppFormSection";
import AppButton from "@/components/common/AppButton";
import { useLoading } from "@/context/LoadingContext";
import z from "zod";
import { productSchema } from "@/lib/validation/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import AppImageUpload from "@/components/common/AppImageUpload";
import { useState } from "react";

type FormData = z.infer<typeof productSchema>;
export default function ProductPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");
  const { setLoading } = useLoading();
  const onSubmit = async (data: any) => {
    if (!image) {
      setImageError("Image is required");
      return;
    }
    try {
      setLoading(true);
      await addProduct({
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      });
      setLoading(false);
      toast.success("Product added");
      reset();
    } catch {
      setLoading(false);
      toast.error("Error");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AppFormSection
          title="Product Info"
          register={register}
          errors={errors}
          fields={[
            { name: "name", placeholder: "Product Name" },
            { name: "description", placeholder: "Description" },
            { name: "price", placeholder: "Price" },
            { name: "stock", placeholder: "Stock" },
          ]}
        />
        <AppImageUpload
          docType="product"
          required={true}
          maxSizeMB={2}
          allowedTypes={["image/png", "image/jpeg"]}
          onChange={(file) => {
            setImage(file);
            if (!file) setImageError("Image is required");
            else setImageError("");
          }}
          error={imageError}
        />
        <div className="flex justify-center">
          <AppButton type="submit">Add Product</AppButton>
        </div>
      </form>
    </div>
  );
}
