import { z } from "zod";

export const resetSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});