"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Square, Trash } from "lucide-react";
import React from "react";

type TodoProps = {
  description: string;
  priority: string;
  isDone: boolean;
};

export default function Todo({ description, priority, isDone }: TodoProps) {
  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <Badge>{priority}</Badge>
        {description}
        <div className="flex items-center gap-2">
          <Checkbox />
          <Trash className="cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  );
}
