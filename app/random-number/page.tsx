"use client";

import RandomNumber from "@/partial/randomNumber/random-number";

export default function RandomNumberPage() {
  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <RandomNumber />
    </section>
  );
}
