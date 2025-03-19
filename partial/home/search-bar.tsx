"use client";

import { Input } from "@/components/ui/input";

export default function SearchBar({
  setQuery,
}: {
  setQuery: (query: string) => void;
}) {
  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}
