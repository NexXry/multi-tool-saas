export type PomodoroTimer = {
  session: {
    originalWorkTime: string;
    originalBreakTime: string;
  };
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
