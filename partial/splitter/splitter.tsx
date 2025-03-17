"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function Splitter() {
  const [names, setNames] = useState<string[]>([]);
  const [splited, setSplited] = useState<string[][]>([]);
  const [name, setName] = useState<string>("");
  const [groupSize, setGroupSize] = useState<number>(2);

  const handleAddName = () => {
    if (name.trim()) {
      setNames([...names, name]);
      setName("");
    }
  };

  const handleRemoveName = (index: number) => {
    const newNames = [...names];
    newNames.splice(index, 1);
    setNames(newNames);
    setSplited([]);
  };

  const handleSplit = () => {
    const shuffled = [...names].sort(() => 0.5 - Math.random());
    const numGroups = Math.ceil(shuffled.length / groupSize);
    const result: string[][] = Array.from({ length: numGroups }, () => []);

    shuffled.forEach((name, index) => {
      const groupIndex = index % numGroups;
      result[groupIndex].push(name);
    });

    const filteredResult = result.filter((group) => group.length > 0);

    setSplited(filteredResult);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim()) {
      handleAddName();
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Splitter</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <Input
            type="text"
            placeholder="John doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            placeholder="Number of people in the group"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value) || 1)}
            min="1"
          />
          <Button onClick={handleAddName}>Add</Button>
        </div>
        <div className="flex flex-col gap-2">
          {names.map((name, index) => (
            <Card key={index}>
              <CardContent className="flex flex-row justify-between items-center p-4">
                <Badge>{name}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleRemoveName(index)}
                >
                  <Trash size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          className="cursor-pointer"
          onClick={handleSplit}
          disabled={names.length < 2}
        >
          Split
        </Button>
        <div className="flex flex-col gap-2">
          {splited.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {splited.map((group, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Group {index + 1}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.map((name, nameIndex) => (
                        <Badge key={nameIndex} variant="secondary">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
