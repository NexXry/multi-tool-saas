"use client";

import AddElement from "@/partial/todolist/add-element";
import Todo from "@/partial/todolist/todo";
import { Todo as TodoType } from "@/type/Todo";
import { useState } from "react";

export default function Todolist() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (todo: TodoType) => {
    setTodos([...todos, todo]);
  };

  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <AddElement onAdd={addTodo} />
      {todos.map((todo, key) => (
        <Todo
          key={key}
          description={todo.description}
          priority={todo.priority}
          isDone={todo.isDone}
        />
      ))}
    </section>
  );
}
