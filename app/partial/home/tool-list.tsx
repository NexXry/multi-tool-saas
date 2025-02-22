import ToolCard from "@/components/card/tool-card";
import { ListTodo, Shapes } from "lucide-react";
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
    </div>
  );
}
