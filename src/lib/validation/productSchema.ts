import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name required"),
  description: z.string().min(5, "Description required"),
  price: z
    .string()
    .min(1, "Price required")
    .refine((val) => !isNaN(Number(val)), "Price must be a number"),
  stock: z
    .string()
    .min(1, "Stock required")
    .refine((val) => !isNaN(Number(val)), "Stock must be a number"),
  imageUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
});