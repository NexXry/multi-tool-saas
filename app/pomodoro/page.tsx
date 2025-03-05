"use client";

import PomodoroTimer from "@/partial/pomodoro/pomodoro-timer";

export default function Pomodoro() {
  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <PomodoroTimer />
    </section>
  );
}
