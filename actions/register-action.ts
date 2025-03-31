"use server";
import { registerSchema } from "@/schema/registerSchema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export async function register(z: z.infer<typeof registerSchema>) {
  const result = registerSchema.parse(z);
  const hash = await bcrypt.hash(result.password, 10);
  try {
    await db.insert(users).values({ email: result.email, password: hash });
  } catch (error) {
    console.log(error.message);
    return { success: false, error };
  }

  return { success: true };
}
