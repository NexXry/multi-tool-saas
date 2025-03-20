"use server";
import { db } from "@/lib/db";
import { tools } from "@/lib/schema";

export async function getTools() {
  const allTools = await db.select().from(tools);
  return allTools.map((tool: { id: number; name: string }) => ({
    value: tool.id.toString(),
    label: tool.name,
  }));
}
