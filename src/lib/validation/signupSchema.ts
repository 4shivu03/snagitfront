import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().length(10, "Mobile must be 10 digits"),
  password: z.string().min(6, "Minimum 6 characters"),
});
