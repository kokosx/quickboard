"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { signinSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { revalidateAction } from "../../../server/actions/revalidate";
import { toast } from "sonner";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    form.clearErrors();
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          void revalidateAction("/", "layout");

          const closeButton = document.querySelector("#close-drawer");
          if (closeButton instanceof HTMLButtonElement) {
            closeButton.click();
          }
          toast.success("Signed up successfully");
          form.reset();
        },
        onError: (err) => {
          if (err.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            form.setError("email", {
              type: "custom",
              message: "Invalid email or password",
            });
          } else {
            toast.error("Something went wrong");
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Login</DrawerTitle>
            <DrawerDescription>
              Access your QuickBoard account
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DrawerFooter>
            <Button disabled={loading}>Submit</Button>
            <DrawerClose asChild>
              <Button id="close-drawer" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
