"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/partial/auth/login";
import SignUp from "@/partial/auth/signup";

export default function AuthPage() {
  return (
    <section className="min-h-screen flex items-center justify-center w-full md:w-1/2 mx-auto">
      <Tabs defaultValue="login">
        <TabsList className="w-[400px]">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </section>
  );
}
