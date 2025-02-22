"use client";

import SearchBar from "./partial/home/search-bar";
import ToolList from "./partial/home/tool-list";

export default function Home() {
  return (
    <section className="flex flex-col gap-6">
      <SearchBar />
      <ToolList />
    </section>
  );
}
