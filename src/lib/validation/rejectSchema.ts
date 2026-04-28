import { z } from "zod";

export const rejectSchema = z.object({
  reason: z
    .string()
    .min(5, "Reason must be at least 5 characters")
    .max(200, "Max 200 characters"),
});