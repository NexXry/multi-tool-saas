"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Temperature() {
  const [temperature, setTemperature] = useState<number>(0);
  const [unit, setUnit] = useState<string>("c");
  const [c, setC] = useState<number>();
  const [f, setF] = useState<number>();

  const handleTemperature = () => {
    if (unit === "c") {
      setC(temperature);
      setF(temperature * 1.8 + 32);
    } else {
      setF(temperature);
      setC(((temperature - 32) * 5) / 9);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="temperature to convert"
            type="number"
            value={temperature}
            onChange={(e) => {
              setTemperature(Number(e.target.value));
              handleTemperature();
            }}
          />
          <Select
            value={unit}
            onValueChange={(value) => {
              setUnit(value);
              handleTemperature();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="f">F</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 min-w-[250px] w-full">
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>C</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {c === undefined ? 0 : Number(c.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>F</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {f === undefined ? 0 : Number(f.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
