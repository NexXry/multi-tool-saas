import { DateInput } from "@/components/input/date-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "@/type/Todo";
import React, { useState } from "react";

type AddElementProps = {
  onAdd: (todo: Todo) => void;
};

export default function AddElement({ onAdd }: AddElementProps) {
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    description: "",
    priority: "low",
    isDone: false,
  });

  const handleAdd = () => {
    onAdd(todo);
    setTodo({
      id: Math.floor(Math.random() * 1000000),
      description: "",
      priority: "low",
      isDone: false,
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-4">
          <Input
            type="text"
            value={todo.description}
            placeholder="Add a todo"
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </div>
        <div className="flex gap-4">
          <Select
            onValueChange={(value) => setTodo({ ...todo, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </div>
    </>
  );
}
