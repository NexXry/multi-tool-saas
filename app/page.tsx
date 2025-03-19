"use client";

import SearchBar from "@/partial/home/search-bar";
import ToolList from "@/partial/home/tool-list";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  return (
    <section className="flex flex-col gap-6">
      <SearchBar setQuery={setQuery} />
      <ToolList query={query} />
    </section>
  );
}
