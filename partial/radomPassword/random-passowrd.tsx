"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type AddPasswordProps = {
  addPassword: (password: string) => void;
};

export default function RandomPassword({ addPassword }: AddPasswordProps) {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [specialChars, setSpecialChars] = useState<boolean>(false);

  const randomPassword = () => {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const specialCharacts = "!@#$%^&*()_+-=[]{}|;:,.<>/?";
    var randomstring = "";
    const charsToUse = specialChars ? chars + specialCharacts : chars;
    for (var i = 0; i < length; i++) {
      let rnum = Math.floor(Math.random() * charsToUse.length);
      randomstring += charsToUse.substring(rnum, rnum + 1);
    }
    setPassword(randomstring);
    addPassword(randomstring);
  };

  const editPassowrd = (password: string) => {
    setPassword(password);
    addPassword(password);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        type="text"
        value={password}
        onChange={(e) => editPassowrd(e.target.value)}
      />
      <div className="flex  justify-between items-center gap-4">
        <Input
          className="w-32"
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          placeholder="Length"
        />
        <label className="flex items-center gap-2" htmlFor="specialCharacters">
          Special characters
          <Checkbox
            id="specialCharacters"
            checked={specialChars}
            onCheckedChange={() => setSpecialChars(!specialChars)}
          />
        </label>
        <Button onClick={randomPassword}>Generate</Button>
      </div>
    </div>
  );
}
