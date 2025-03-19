import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(4),
  password: z.string(),
});
