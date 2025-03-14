"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

export default function PrettierJson() {
  const [json, setJson] = useState("");

  const format = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      setJson(formatted);
    } catch (error) {
      setJson(jsonString);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:flex-row gap-4 w-full">
      <h1 className="text-2xl">Json prettier</h1>
      <div className="w-full">
        <Textarea
          value={json}
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            format(e.target.value)
          }
          className="h-full min-h-[200px]"
          placeholder="Enter your json"
        />
      </div>
    </div>
  );
}
