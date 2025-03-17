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

export default function Speed() {
  const [unit, setUnit] = useState<string>("km/h");
  const [speed, setSpeed] = useState<number>(0);
  const [kmh, setKmh] = useState<number>();
  const [mph, setMph] = useState<number>();

  const handleSpeed = () => {
    if (unit === "km/h") {
      setKmh(speed);
      setMph(speed * 0.621371);
    } else {
      setMph(speed);
      setKmh(speed * 1.60934);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="speed to convert"
            type="number"
            value={speed}
            onChange={(e) => {
              setSpeed(Number(e.target.value));
              handleSpeed();
            }}
          />
          <Select
            value={unit}
            onValueChange={(value) => {
              setUnit(value);
              handleSpeed();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km/h">KM/H</SelectItem>
              <SelectItem value="mph">MPH</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 min-w-[250px] w-full">
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>KM/H</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {kmh === undefined ? 0 : Number(kmh.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>MPH</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {mph === undefined ? 0 : Number(mph.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
