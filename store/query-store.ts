import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

interface QueryClientState {
  queryClient: QueryClient;
  setQueryClient: (queryClient: QueryClient) => void;
}

export const useQueryClientStore = create<QueryClientState>()((set) => ({
  queryClient: new QueryClient(),
  setQueryClient: (queryClient) =>
    set((state) => ({ queryClient: queryClient })),
}));
