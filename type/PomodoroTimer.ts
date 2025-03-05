export type PomodoroTimer = {
  workTime: {
    time: string;
    isStarted: boolean;
    isDone: boolean;
  };
  breakTime: {
    time: string;
    isStarted: boolean;
    isDone: boolean;
  };
  currentTab: "work" | "break";
};
