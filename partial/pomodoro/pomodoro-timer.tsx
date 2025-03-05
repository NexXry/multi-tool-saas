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
              isStarted: false,
              isDone: true,
            },
            breakTime: {
              ...pomodoro.breakTime,
              isStarted: true,
            },
            currentTab: "break",
          });
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
            time: "00:05",
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
              isStarted: false,
              isDone: true,
            },
            workTime: {
              ...pomodoro.workTime,
              isStarted: true,
            },
            currentTab: "work",
          });
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
            time: "00:05",
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
      ...pomodoro,
      workTime: {
        ...pomodoro.workTime,
        isStarted: !pomodoro.workTime.isStarted,
      },
    });
  };

  const toggleBreakTime = () => {
    setPomodoro({
      ...pomodoro,
      breakTime: {
        ...pomodoro.breakTime,
        isStarted: !pomodoro.breakTime.isStarted,
      },
    });
  };

  const formatTime = (time: string): string => {
    const timePattern = /^(\d{1,2}):(\d{1,2})$/;
    const match = time.match(timePattern);

    if (match) {
      const minutes = match[1].padStart(2, "0");
      const seconds = match[2].padStart(2, "0");
      return `${minutes}:${seconds}`;
    }

    return "00:00";
  };

  const handleWorkTime = (time: string) => {
    const formattedTime = formatTime(time);
    console.log(formattedTime);

    setPomodoro({
      ...pomodoro,
      workTime: {
        ...pomodoro.workTime,
        time: formattedTime,
      },
    });
  };
  const handleBreakTime = (time: string) => {
    setPomodoro({
      ...pomodoro,
      breakTime: {
        ...pomodoro.breakTime,
        time: formatTime(time),
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
