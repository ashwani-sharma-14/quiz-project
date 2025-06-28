import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profile: z.string(),
  branch: z.string(),
  admissionYear: z.number(),
  currentYear: z.number(),
  enrollment: z.string(),
});

export type SignUpData = z.infer<typeof SignupSchema>;
