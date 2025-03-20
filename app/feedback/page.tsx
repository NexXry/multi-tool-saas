"use client";

import Feedback from "@/partial/feedback/feedback";

export default function FeedbackPage() {
  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">Feedback</h1>
      <Feedback />
    </section>
  );
}
