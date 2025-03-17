"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Character() {
  const [utf8, setUtf8] = useState<string>("");
  const [utf16, setUtf16] = useState<string>("");

  const handleTextChange = (text: string) => {
    const utf8Array = new TextEncoder().encode(text);
    const utf16Array = new TextEncoder().encode(text);
    setUtf8(new TextDecoder().decode(utf8Array));
    setUtf16(new TextDecoder().decode(utf16Array));
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Convert ASCI to UTF-8/16
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Add text to convert"
            onChange={(e) => handleTextChange(e.target.value)}
          />
          <label htmlFor="">
            UTF-8
            <Input id="utf8" type="text" readOnly value={utf8} />
          </label>
          <label htmlFor="utf16">
            UTF-16
            <Input id="utf16" type="text" readOnly value={utf16} />
          </label>
        </div>
        <div className="flex gap-4"></div>
      </div>
    </>
  );
}
