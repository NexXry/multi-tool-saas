"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import RandomPassword from "@/partial/radomPassword/random-passowrd";
import { usePasswordListStore } from "@/store/password-store";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function RandomPasswordPage() {
  const { addPassword, passwords, removePassword } = usePasswordListStore();
  const addNewPassword = (password: string) => {
    const id = crypto.randomUUID();
    addPassword({ password, id });
  };

  const toClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Password copied to clipboard");
  };

  return (
    <section className="w-full md:w-1/2 mx-auto flex flex-col gap-6">
      <RandomPassword addPassword={addNewPassword} />
      <h1>Generated password</h1>
      <div className="flex flex-col gap-2 ">
        {passwords.reverse().map((password) => (
          <Card className="text-lg w-full cursor-pointer" key={password.id}>
            <CardContent className="flex items-center justify-between ">
              <Badge
                onClick={() => toClipboard(password.password)}
                className="cursor-pointer hover:text-violet-500"
              >
                {password.password}
              </Badge>
              <Trash
                className="cursor-pointer hover:text-red-500"
                onClick={() => removePassword(password.id)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
