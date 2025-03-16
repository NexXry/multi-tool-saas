"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function RandomNumberPage() {
  const [max, setMax] = useState<number>(100);
  const [randomNumber, setRandomNumber] = useState<number>();

  const randomNumberGenerator = () => {
    const number = Math.floor(Math.random() * max + 1);
    setRandomNumber(number);
  };

  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center">
        Generated random number
      </h1>
      <div className="flex flex-col gap-2">
        <Card className="text-lg w-full cursor-pointer">
          <CardContent className="flex flex-col gap-6  items-center justify-between ">
            <Badge className="cursor-pointer hover:text-violet-500 py-4 px-9 text-6xl">
              {randomNumber}
            </Badge>
            <div className="flex justify-between items-center gap-2">
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
              />
              <Button
                onClick={randomNumberGenerator}
                className="cursor-pointer hover:text-violet-500"
              >
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
