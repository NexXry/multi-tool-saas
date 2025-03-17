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

export default function Distance() {
  const [distance, setDistance] = useState<number>(0);
  const [unit, setUnit] = useState<string>("km");
  const [km, setKm] = useState<number>();
  const [miles, setMiles] = useState<number>();

  const handleDistance = () => {
    if (unit === "km") {
      setKm(distance);
      setMiles(distance * 0.621371);
    } else {
      setMiles(distance);
      setKm(distance * 1.60934);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="distance to convert"
            type="number"
            value={distance}
            onChange={(e) => {
              setDistance(Number(e.target.value));
              handleDistance();
            }}
          />
          <Select
            value={unit}
            onValueChange={(value) => {
              setUnit(value);
              handleDistance();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km">KM</SelectItem>
              <SelectItem value="miles">MILES</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 min-w-[250px] w-full">
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>KM</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {km === undefined ? 0 : Number(km.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>MILES</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {miles === undefined ? 0 : Number(miles.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
