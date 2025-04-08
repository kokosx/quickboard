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
import { signupSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { revalidateAction } from "../../../server/actions/revalidate";
import { toast } from "sonner";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    form.clearErrors();
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
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
        onError: (error) => {
          console.log(error);
          if (error.error.code === "FAILED_TO_CREATE_USER") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error.error.details?.meta?.modelName === "User") {
              form.setError("name", {
                message: "Name is taken",
              });
            }
          }
          if (error.error.code === "USER_ALREADY_EXISTS") {
            console.log("Email is taken");
            form.setError("email", {
              message: "Email is taken",
            });
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
            <DrawerTitle>Register</DrawerTitle>
            <DrawerDescription>
              Create your account on QuickBoard
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat password</FormLabel>
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

export default RegisterForm;
