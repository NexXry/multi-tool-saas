"use client";

import PrettierJson from "@/partial/prettier/prettier-json";

export default function Prettier() {
  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <PrettierJson />
    </section>
  );
}
