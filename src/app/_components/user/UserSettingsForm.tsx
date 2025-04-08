"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../../../lib/schemas/user";
import { api } from "../../../trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import AvatarEditor from "./AvatarEditor";
import { type User } from "../../../lib/auth-client";
import { type z } from "zod";
import { revalidateAction } from "../../../server/actions/revalidate";
import { toast } from "sonner";

type Props = {
  user: User;
};

const UserSettingsForm = ({ user }: Props) => {
  const editUser = api.user.edit.useMutation({
    onSuccess: async () => {
      await revalidateAction("/", "layout");
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      bio: user.bio,
      name: user.name,
      avatar: user.image,
    },
  });
  const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
    await editUser.mutateAsync(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col-reverse items-center md:flex-row">
          <div className="mx-auto w-full max-w-sm">
            <div className="space-y-6 p-4 pb-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={editUser.isPending}>Submit changes</Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <AvatarEditor
                name={user.name}
                initialAvatar={user.image}
                onSave={field.onChange}
              />
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default UserSettingsForm;
