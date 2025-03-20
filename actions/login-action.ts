"use server";
import { loginSchema } from "@/schema/loginSchema";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

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

    const hash = await bcrypt.hash(result.password, 10);
    const isMatch = await bcrypt.compare(result.password, hash);
    if (!isMatch) {
      return { success: false, error: "Invalid password" };
    }

    const payload = { id: user[0].id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "100h",
    });

    return { success: true, token };
  } catch (error) {
    return { success: false, error };
  }
}

export const verifyToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, error };
  }
};
