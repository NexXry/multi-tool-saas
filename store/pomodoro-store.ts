import { PomodoroTimer } from "@/type/PomodoroTimer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PomodoroTimerState {
  pomodoro: PomodoroTimer;
  setPomodoro: (state: PomodoroTimer) => void;
}

export const usePomodoroTimerStore = create<PomodoroTimerState>()(
  persist(
    (set) => ({
      pomodoro: {
        workTime: { time: "00:05", isStarted: false, isDone: false },
        breakTime: { time: "00:05", isStarted: false, isDone: false },
        currentTab: "work",
      },
      setPomodoro: (state: PomodoroTimer) => set({ pomodoro: state }),
    }),
    {
      name: "pomodoro-timer-store",
    }
  )
);
