"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Check, Square, Trash } from "lucide-react";
import React from "react";

type TodoProps = {
  description: string;
  priority: string;
  isDone: boolean;
  onCheck: () => void;
  onRemove: () => void;
};

export default function Todo({
  description,
  priority,
  isDone,
  onCheck,
  onRemove,
}: TodoProps) {
  const getBadgeColor = () => {
    switch (priority) {
      case "medium":
        return "bg-yellow-600";
      case "high":
        return "bg-red-500";
    }
  };

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <Badge className={getBadgeColor()}>{priority}</Badge>
        <p className={isDone ? "line-through" : ""}>{description}</p>
        <div className="flex items-center gap-2">
          <Checkbox
            onCheckedChange={onCheck}
            className="cursor-pointer hover:text-red-500"
          />
          <Trash
            onClick={onRemove}
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}
