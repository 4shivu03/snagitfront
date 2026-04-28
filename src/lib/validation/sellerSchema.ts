import { z } from "zod";

export const sellerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode"),
  businessName: z.string().min(2, "Business name required"),
  gstNumber: z
    .string()
    .min(5, "GST required"),
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN"),
  accountHolderName: z.string().min(2, "Account holder required"),
  accountNumber: z
    .string()
    .min(8, "Invalid account number"),
  ifscCode: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC"),
  bankName: z.string().min(2, "Bank name required"),
});