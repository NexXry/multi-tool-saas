"use server";

import { db } from "@/lib/db";
import { feedbacks, tools, users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getFeedbacks() {
  const allFeedbacks = await db
    .select()
    .from(feedbacks)
    .innerJoin(users, eq(users.id, feedbacks.userId))
    .innerJoin(tools, eq(tools.id, feedbacks.toolId));
  return { allFeedbacks };
}

export async function createFeedback({
  message,
  toolId,
  userId,
}: {
  message: string;
  toolId: number;
  userId: number;
}) {
  try {
    await db.insert(feedbacks).values({
      message,
      toolId,
      userId,
    });
  } catch (error) {
    return { success: false };
  }

  return { success: true };
}

export async function deleteFeedback(id: number) {
  try {
    await db.delete(feedbacks).where(eq(feedbacks.id, id));
  } catch (error) {
    return { success: false };
  }

  return { success: true };
}
