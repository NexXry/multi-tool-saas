"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import CryptoJS from "crypto-js";
export default function Hash() {
  const [sha256, setSha256] = useState<string>("");
  const [md5, setMd5] = useState<string>("");

  const hashSHA256 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const hashMD5 = (text: string) => {
    return CryptoJS.MD5(text).toString();
  };

  const handleTextChange = async (text: string) => {
    setSha256(await hashSHA256(text));
    setMd5(hashMD5(text));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold text-center">Generated hash</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <Input
            type="text"
            defaultValue={""}
            placeholder="Add text to hash"
            onChange={(e) => handleTextChange(e.target.value)}
          />
          <label htmlFor="">
            SHA256
            <Input id="sha256" type="text" readOnly value={sha256} />
          </label>

          <label htmlFor="octal">
            MD5
            <Input id="md5" type="text" readOnly value={md5} />
          </label>
        </div>
        <div className="flex gap-4"></div>
      </div>
    </div>
  );
}
