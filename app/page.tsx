"use client";

import SearchBar from "@/partial/home/search-bar";
import ToolList from "@/partial/home/tool-list";
import TiktokConnector from "@/partial/tiktok/tiktok-connector";

export default function Home() {
  return (
    <section className="flex flex-col gap-6">
      <SearchBar />
      <ToolList />
    </section>
  );
}
