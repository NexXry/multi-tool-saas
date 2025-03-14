import { Password } from "@/type/Password";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PasswordListState {
  passwords: Password[];
  addPassword: (password: Password) => void;
  removePassword: (id: string) => void;
}

export const usePasswordListStore = create<PasswordListState>()((set) => ({
  passwords: [],
  addPassword: (password) =>
    set((state) => ({ passwords: [...state.passwords, password] })),
  removePassword: (id) =>
    set((state) => ({
      passwords: state.passwords.filter((password) => password.id !== id),
    })),
}));
