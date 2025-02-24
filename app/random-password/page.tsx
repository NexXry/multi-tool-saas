"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import RandomPassword from "@/partial/radomPassword/random-passowrd";
import { Trash } from "lucide-react";
import { useState } from "react";

type Password = {
  password: string;
  id: number;
};

export default function RandomPasswordPage() {
  const [generatedPassword, setGeneratedPassword] = useState<Password[]>([]);

  const addPassword = (password: string) => {
    setGeneratedPassword([
      ...generatedPassword,
      { password, id: Math.floor(Math.random() * 1000000) },
    ]);
  };

  const removePassword = (passwordToRemove: Password) => {
    setGeneratedPassword((prev) =>
      prev.filter((password) => password.id !== passwordToRemove.id)
    );
  };

  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <RandomPassword addPassword={addPassword} />
      <h1>Generated password</h1>
      <div className="flex flex-col gap-2">
        {[...generatedPassword].reverse().map((password) => (
          <Card className="text-lg w-full cursor-pointer" key={password.id}>
            <CardContent className="flex items-center justify-between ">
              <Badge>{password.password}</Badge>
              <Trash
                className="cursor-pointer hover:text-red-500"
                onClick={() => removePassword(password)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
