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

export default function Money() {
  const [money, setMoney] = useState<number>(0);
  const [unit, setUnit] = useState<string>("usd");
  const [usd, setUsd] = useState<number>();
  const [euro, setEuro] = useState<number>();

  const handleMoney = () => {
    if (unit === "usd") {
      setUsd(money);
      setEuro(money * 0.84);
    } else {
      setEuro(money);
      setUsd(money * 1.19);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="money to convert"
            type="number"
            value={money}
            onChange={(e) => {
              setMoney(Number(e.target.value));
              handleMoney();
            }}
          />
          <Select
            value={unit}
            onValueChange={(value) => {
              setUnit(value);
              handleMoney();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="euro">EURO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4 min-w-[250px] w-full">
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>USD</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {usd === undefined ? 0 : Number(usd.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
          <Card className="flex flex-row justify-between items-center">
            <CardHeader>EURO</CardHeader>
            <CardContent>
              <Badge className="text-2xl">
                {euro === undefined ? 0 : Number(euro.toFixed(2))}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
