"use client";

import AddElement from "@/partial/todolist/add-element";
import Todo from "@/partial/todolist/todo";
import { useTodoListStore } from "@/store/todo-list-store";

export default function Todolist() {
  const { todos, addTodo, removeTodo, checkTodo } = useTodoListStore();

  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <AddElement onAdd={addTodo} />
      {todos.map((todo, key) => (
        <Todo
          key={key}
          description={todo.description}
          priority={todo.priority}
          isDone={todo.isDone}
          onCheck={() => checkTodo(todo.id)}
          onRemove={() => removeTodo(todo.id)}
        />
      ))}
    </section>
  );
}
