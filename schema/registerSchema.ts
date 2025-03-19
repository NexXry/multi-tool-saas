import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().min(4),
  password: z
    .string()
    .min(12)
    .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
});
