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

export default function Weight() {
  const [weight, setWeight] = useState<number>(0);
  const [unit, setUnit] = useState<string>("kg");
  const [kg, setKg] = useState<number>();
  const [lb, setLb] = useState<number>();

  const handleWeight = () => {
    if (unit === "kg") {
      setKg(weight);
      setLb(weight * 2.20462);
    } else {
      setLb(weight);
      setKg(weight * 0.453592);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="weight to convert"
            type="number"
            onChange={(e) => {
              setWeight(Number(e.target.value));
              handleWeight();
            }}
          />
          <Select
            value={unit}
            onValueChange={(value) => {
              setUnit(value);
              handleWeight();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">KG</SelectItem>
              <SelectItem value="lb">LB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 min-w-[250px] w-full">
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>KG</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {kg === undefined ? 0 : Number(kg.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>LB</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {lb === undefined ? 0 : Number(lb.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
