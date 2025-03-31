import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Todo } from "@/type/Todo";
import React, { useState } from "react";

type Convert = {
  binary: string;
  octal: string;
  hexadecimal: string;
};

export default function BinaryHexOctal() {
  const [convert, setConvert] = useState<Convert>({
    binary: "",
    octal: "",
    hexadecimal: "",
  });

  const handleConvert = (value: number) => {
    const binary = value.toString(2);
    const octal = value.toString(8);
    const hexadecimal = value.toString(16);
    setConvert({
      ...convert,
      binary,
      octal,
      hexadecimal,
    });
  };

  const handleBinaryConvert = (value: string) => {
    const binary = value ? parseInt(value, 2) : 0;
    const octal = binary.toString(8);
    const hexadecimal = binary.toString(16);
    setConvert({
      ...convert,
      binary: value,
      octal,
      hexadecimal,
    });
  };

  const handleOcalConvert = (value: string) => {
    const octal = value ? parseInt(value, 8) : 0;
    const binary = octal.toString(2);
    const hexadecimal = octal.toString(16);
    setConvert({
      ...convert,
      binary,
      octal: value,
      hexadecimal,
    });
  };

  const handleHexConvert = (value: string) => {
    const hexadecimal = value ? parseInt(value, 16) : 0;
    const binary = hexadecimal.toString(2);
    const octal = hexadecimal.toString(8);
    setConvert({
      ...convert,
      hexadecimal: value,
      binary,
      octal,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-2xl text-center">Binary Hex Octal</h1>
        <div className="flex flex-col gap-4 w-full">
          <Input
            type="text"
            placeholder="Add a number to convert"
            onChange={(e) =>
              handleConvert(e.target.value ? parseInt(e.target.value) : 0)
            }
          />
          <label htmlFor="">
            Binary
            <Input
              id="binary"
              type="text"
              value={convert.binary}
              onChange={(e) => handleBinaryConvert(e.target.value)}
            />
          </label>

          <label htmlFor="octal">
            Octal
            <Input
              id="octal"
              type="text"
              value={convert.octal}
              onChange={(e) => handleOcalConvert(e.target.value)}
            />
          </label>

          <label htmlFor="">
            Hexadecimal
            <Input
              id="hexadecimal"
              type="text"
              value={convert.hexadecimal}
              onChange={(e) => handleHexConvert(e.target.value)}
            />
          </label>
        </div>
        <div className="flex gap-4"></div>
      </div>
    </>
  );
}
