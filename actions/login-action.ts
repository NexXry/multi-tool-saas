"use server";
import { loginSchema } from "@/schema/loginSchema";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import axios from "axios";

export async function login(z: z.infer<typeof loginSchema>) {
  const result = loginSchema.parse(z);
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, result.email));
    if (!user.length) {
      return { success: false, error: "User not found" };
    }

    const response = await axios.post("/api/login", result);
    console.log(response);

    if (response.status === 200) {
      return { success: true };
    }
  } catch (error) {
    return { success: false, error };
  }
}
