import ToolCard from "@/components/card/tool-card";
import {
  Binary,
  FileJson,
  Hash,
  HashIcon,
  ListTodo,
  LockKeyhole,
  PiIcon,
  Shapes,
  Timer,
  Weight,
  WholeWord,
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
      <ToolCard
        icon={<FileJson />}
        href="/prettier"
        title="Json prettier"
        description="A simple json prettier."
      ></ToolCard>
      <ToolCard
        icon={<PiIcon />}
        href="/random-number"
        title="Random number"
        description="Generate a random number."
      ></ToolCard>
      <ToolCard
        icon={<HashIcon />}
        href="/hash"
        title="Hash SHA256 - MD5"
        description="Generate a hash SH256 - MD5."
      ></ToolCard>
      <ToolCard
        icon={<Weight />}
        href="/metrics"
        title="Metrics"
        description="A metrics tool to convert weight, speed, distance, temperature, money."
      ></ToolCard>
    </div>
  );
}
