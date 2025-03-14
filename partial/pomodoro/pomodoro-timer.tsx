"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePomodoroTimerStore } from "@/store/pomodoro-store";
import type { PomodoroTimer } from "@/type/PomodoroTimer";
import { useEffect } from "react";

export default function PomodoroTimer() {
  const { pomodoro, setPomodoro } = usePomodoroTimerStore();
  useEffect(() => {
    if (pomodoro.workTime.isStarted) {
      const timer = setInterval(() => {
        if (pomodoro.workTime.time === "00:00") {
          setPomodoro({
            ...pomodoro,
            workTime: {
              ...pomodoro.workTime,
              time: pomodoro.session.originalWorkTime,
              isStarted: false,
              isDone: true,
            },
            breakTime: {
              ...pomodoro.breakTime,
              isStarted: true,
            },
            currentTab: "break",
          });

          new Audio("/beep.mp3").play();
          return;
        }

        setPomodoro({
          ...pomodoro,
          workTime: {
            ...pomodoro.workTime,
            time: decrementTime(pomodoro.workTime.time),
          },
        });
      }, 1000);

      if (pomodoro.workTime.isDone) {
        setPomodoro({
          ...pomodoro,
          workTime: {
            time: formatTime(pomodoro.workTime.time),
            isStarted: false,
            isDone: false,
          },
          breakTime: {
            ...pomodoro.breakTime,
            isStarted: true,
          },
          currentTab: "break",
        });
      }

      return () => clearInterval(timer);
    }
  }, [pomodoro.workTime]);

  useEffect(() => {
    if (pomodoro.breakTime.isStarted) {
      const timer = setInterval(() => {
        if (pomodoro.breakTime.time === "00:00") {
          setPomodoro({
            ...pomodoro,
            breakTime: {
              ...pomodoro.breakTime,
              time: pomodoro.session.originalBreakTime,
              isStarted: false,
              isDone: true,
            },
            workTime: {
              ...pomodoro.workTime,
              isStarted: true,
            },
            currentTab: "work",
          });
          new Audio("/beep.mp3").play();
          return;
        }

        setPomodoro({
          ...pomodoro,
          breakTime: {
            ...pomodoro.breakTime,
            time: decrementTime(pomodoro.breakTime.time),
          },
        });
      }, 1000);

      if (pomodoro.breakTime.isDone) {
        setPomodoro({
          ...pomodoro,
          breakTime: {
            time: formatTime(pomodoro.workTime.time),
            isStarted: false,
            isDone: false,
          },
          workTime: {
            ...pomodoro.workTime,
            isStarted: true,
          },
          currentTab: "work",
        });
      }

      return () => clearInterval(timer);
    }
  }, [pomodoro.breakTime]);

  const decrementTime = (time: string) => {
    const [minutes, seconds] = time.split(":");
    const newSeconds = parseInt(seconds) > 0 ? parseInt(seconds) - 1 : 59;
    const newMinutes = newSeconds === 59 ? parseInt(minutes) - 1 : minutes;
    return `${newMinutes}:${newSeconds.toString().padStart(2, "0")}`;
  };

  const toggleWorkTime = () => {
    setPomodoro({
      ...pomodoro,
      workTime: {
        ...pomodoro.workTime,
        time: formatTime(pomodoro.workTime.time),
        isStarted: !pomodoro.workTime.isStarted,
      },
    });
  };

  const toggleBreakTime = () => {
    setPomodoro({
      ...pomodoro,
      breakTime: {
        ...pomodoro.breakTime,
        time: formatTime(pomodoro.workTime.time),
        isStarted: !pomodoro.breakTime.isStarted,
      },
    });
  };

  const formatTime = (time: string): string => {
    if (time.includes(":")) {
      const parts = time.split(":");
      const minutes = parts[0] ? parts[0].trim() : "0";
      const seconds = parts[1] ? parts[1].trim() : "0";
      return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    } else {
      const minutes = time.trim();
      return `${minutes.padStart(2, "0")}:00`;
    }
  };

  const handleWorkTime = (time: string) => {
    setPomodoro({
      ...pomodoro,
      session: {
        ...pomodoro.session,
        originalWorkTime: time,
      },
      workTime: {
        ...pomodoro.workTime,
        time: time,
      },
    });
  };
  const handleBreakTime = (time: string) => {
    setPomodoro({
      ...pomodoro,
      session: {
        ...pomodoro.session,
        originalBreakTime: time,
      },
      breakTime: {
        ...pomodoro.breakTime,
        time: time,
      },
    });
  };

  const handleTabChange = (tab: "work" | "break") => {
    setPomodoro({
      ...pomodoro,
      currentTab: tab,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center md:flex-row gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-4xl">Pomodoro Timer</h1>
        <Tabs
          value={pomodoro.currentTab}
          onValueChange={(value) => handleTabChange(value as "work" | "break")}
          className="w-[400px]"
        >
          <TabsList>
            <TabsTrigger value="work">Work Time</TabsTrigger>
            <TabsTrigger value="break">Short Break Time</TabsTrigger>
          </TabsList>
          <TabsContent
            className="flex flex-col justify-center gap-2"
            value="work"
          >
            <Input
              type="text"
              className="w-full h-24 text-center text-6xl"
              value={pomodoro.workTime.time}
              onChange={(e) => handleWorkTime(e.target.value)}
            />
            <Button onClick={toggleWorkTime}>
              {pomodoro.workTime.isStarted ? "Stop" : "Start"}
            </Button>
          </TabsContent>
          <TabsContent
            className="flex flex-col justify-center gap-2"
            value="break"
          >
            <Input
              type="text"
              className="w-96 h-24 text-center text-6xl"
              value={pomodoro.breakTime.time}
              onChange={(e) => handleBreakTime(e.target.value)}
            />
            <Button onClick={toggleBreakTime}>
              {pomodoro.breakTime.isStarted ? "Stop" : "Start"}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
