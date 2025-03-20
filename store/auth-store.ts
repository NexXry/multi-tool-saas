import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  email: string | null;
  setAuth: (token: string, email: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      setAuth: (token, email) => set({ token, email }),
      clear: () => set({ token: null, email: null }),
    }),
    {
      name: "auth",
    }
  )
);
