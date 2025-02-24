import ToolCard from "@/components/card/tool-card";
import { Hash, ListTodo, LockKeyhole, Shapes } from "lucide-react";
import React from "react";

export default function ToolList() {
  return (
    <div className="flex flex-wrap gap-6">
      <ToolCard
        icon={<ListTodo />}
        href="/todolist"
        title="Todo list"
        description="A simple todo list with local storage."
      ></ToolCard>
      <ToolCard
        icon={<LockKeyhole />}
        href="/random-password"
        title="Random password"
        description="Generate a random password."
      ></ToolCard>
    </div>
  );
}
