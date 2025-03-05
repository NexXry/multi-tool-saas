import ToolCard from "@/components/card/tool-card";
import {
  Binary,
  Hash,
  ListTodo,
  LockKeyhole,
  Shapes,
  Timer,
} from "lucide-react";
import React from "react";

export default function ToolList() {
  return (
    <div className="flex flex-row flex-wrap gap-6">
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
      <ToolCard
        icon={<Binary />}
        href="/binary"
        title="Binary"
        description="Convert a number into a binary, hexa, octal."
      ></ToolCard>
      <ToolCard
        icon={<Timer />}
        href="/pomodoro"
        title="Pomodoro"
        description="A pomodoro timer."
      ></ToolCard>
    </div>
  );
}
