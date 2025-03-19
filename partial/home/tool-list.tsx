import ToolCard from "@/components/card/tool-card";
import {
  Binary,
  FileJson,
  Hash,
  HashIcon,
  ListTodo,
  LockKeyhole,
  MessageCircle,
  PiIcon,
  Shapes,
  Timer,
  Users,
  Weight,
  WholeWord,
} from "lucide-react";
import React from "react";

const tools = [
  {
    icon: ListTodo,
    href: "/todolist",
    title: "Todo list",
    description: "A simple todo list with local storage.",
  },
  {
    icon: LockKeyhole,
    href: "/random-password",
    title: "Random password",
    description: "Generate a random password.",
  },
  {
    icon: Binary,
    href: "/binary",
    title: "Binary",
    description: "Convert a number into a binary, hexa, octal.",
  },
  {
    icon: Timer,
    href: "/pomodoro",
    title: "Pomodoro",
    description: "A pomodoro timer.",
  },
  {
    icon: FileJson,
    href: "/prettier",
    title: "Json prettier",
    description: "A simple json prettier.",
  },
  {
    icon: PiIcon,
    href: "/random-number",
    title: "Random number",
    description: "Generate a random number.",
  },
  {
    icon: HashIcon,
    href: "/hash",
    title: "Hash SHA256 - MD5",
    description: "Generate a hash SH256 - MD5.",
  },
  {
    icon: Weight,
    href: "/metrics",
    title: "Metrics",
    description:
      "A metrics tool to convert weight, speed, distance, temperature, money.",
  },
  {
    icon: Users,
    href: "/splitter",
    title: "Splitter",
    description: "Choose who you want to be in group with for the exercise.",
  },
  {
    icon: MessageCircle,
    href: "/feedback",
    title: "Feedback",
    description: "Send a feedback on tools.",
  },
];

export default function ToolList({ query }: { query: string }) {
  return (
    <div className="flex justify-center flex-row flex-wrap gap-6">
      {tools
        .filter((tool) =>
          tool.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((tool, index) => (
          <ToolCard
            key={index}
            icon={<tool.icon />}
            href={tool.href}
            title={tool.title}
            description={tool.description}
          ></ToolCard>
        ))}
    </div>
  );
}
