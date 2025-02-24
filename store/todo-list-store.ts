import { Todo } from "@/type/Todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoListState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  checkTodo: (id: number) => void;
}

export const useTodoListStore = create<TodoListState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      checkTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          ),
        })),
    }),
    {
      name: "todo-list-store",
    }
  )
);
