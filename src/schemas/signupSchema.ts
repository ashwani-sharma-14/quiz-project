import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpData = z.infer<typeof SignupSchema>;
