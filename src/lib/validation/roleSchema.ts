import { z } from "zod";

export const roleSchema = z.object({
  roleName: z
    .string()
    .min(2, "Role name required")
    .max(50, "Too long"),
  roleCode: z
    .string()
    .min(1, "Role code required")
    .max(3, "Max 3 chars")
    .regex(/^[A-Z]+$/, "Only uppercase letters"),
});