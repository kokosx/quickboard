"use client";

import { useForm } from "react-hook-form";
import { useUser } from "../user/UserProvider";
import { z } from "zod";
import { createCommentSchema } from "../../../lib/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { openAuthDrawer } from "../user/AuthDrawer";
import { Textarea } from "../../../components/ui/textarea";

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

  const onSubmit = (data: z.infer<typeof createCommentSchema>) => {
    if (!user) return;
    console.log(data);
  };
  const handleFormClick = () => {
    if (!user) openAuthDrawer();
  };

  return (
    <div onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
        </form>
      </Form>
    </div>
  );
};

export default CreateComment;
