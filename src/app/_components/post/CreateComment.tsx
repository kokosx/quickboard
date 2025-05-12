"use client";

import { useForm } from "react-hook-form";
import { useUser } from "../user/UserProvider";
import { type z } from "zod";
import { createCommentSchema } from "@/lib/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { openAuthDrawer } from "../user/AuthDrawer";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { api } from "../../../trpc/react";
import { toast } from "sonner";
import { revalidateAction } from "../../../server/actions/revalidate";

type Props = {
  postId: string;
};

const CreateComment = ({ postId }: Props) => {
  const user = useUser();
  const form = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      text: "",
      postId,
    },
  });

  const { mutate, isPending } = api.comment.create.useMutation({
    onSuccess: async () => {
      form.reset();
      toast("Added a comment!");
      await revalidateAction(`/post/${postId}`, "page");
    },
    onError: () => {
      toast("An error occured!");
      form.setError("text", { message: "An error occured" });
    },
  });

  const onSubmit = (data: z.infer<typeof createCommentSchema>) => {
    if (!user) return;
    mutate(data);
  };
  const handleFormClick = () => {
    if (!user) openAuthDrawer();
  };

  return (
    <div onClick={handleFormClick}>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Your comment" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending}>Add</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateComment;
