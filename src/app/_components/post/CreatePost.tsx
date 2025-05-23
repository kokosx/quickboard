"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { openAuthDrawer } from "../user/AuthDrawer";
import { type User } from "better-auth";
import { type Board } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BoardIcon from "../BoardIcon";
import { useForm } from "react-hook-form";
import { addPostSchema } from "@/lib/schemas/post";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useUser } from "../user/UserProvider";
import UserAvatar from "../user/UserAvatar";
import { useRouter } from "next/navigation";

type Props = {
  user?: User;
  boards: Board[];
};

const CreatePost = ({ boards }: Props) => {
  const router = useRouter();
  const user = useUser();
  const handleUnauthedClick = () => {
    if (!user) {
      openAuthDrawer();
    }
  };

  const addPost = api.post.add.useMutation({
    onSuccess: (data) => {
      form.reset();
      toast.success("Post created!");
      router.push(`/post/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message ?? "Unknown error occured");
    },
  });

  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      text: "",
      board: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof addPostSchema>) => {
    addPost.mutate(data);
  };

  return (
    <div
      onClick={handleUnauthedClick}
      className="mb-4 flex gap-4 border-b pb-4 dark:border-gray-800"
    >
      <UserAvatar name={user?.name} image={user?.image} />
      <div className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="What's happening?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 flex justify-between">
              <FormField
                control={form.control}
                name="board"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <BoardChooser {...field} boards={boards} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={addPost.isPending}
                className="rounded-full bg-blue-500 px-4 font-medium text-white hover:bg-blue-600"
                type="submit"
              >
                Post
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;

type BoardChooserProps = {
  boards: Board[];
  onChange: (value: string) => void;
  value: string;
};

const BoardChooser = ({ boards, onChange, value }: BoardChooserProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Board" />
      </SelectTrigger>
      <SelectContent>
        {boards.map((board) => (
          <SelectItem className="flex gap-x-2" key={board.id} value={board.id}>
            <div className="flex items-center gap-x-2">
              {board.name} <BoardIcon name={board.name} />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
