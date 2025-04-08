"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon } from "lucide-react";

const AuthDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button id="open-auth-drawer" variant="outline">
          Sign in <UserIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Tabs className="mx-auto mt-4 w-full max-w-sm" defaultValue="login">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="w-full" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};

export default AuthDrawer;

export const openAuthDrawer = () => {
  const openButton = document.querySelector("#open-auth-drawer");
  if (openButton instanceof HTMLButtonElement) {
    openButton.click();
  }
};
