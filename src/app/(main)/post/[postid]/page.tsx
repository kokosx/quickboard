import React from "react";
import { api } from "../../../../trpc/server";

type Props = {
  params: Promise<{ postid: string }>;
};

const page = async ({ params }: Props) => {
  const post = await api.post.getPost({ postId: (await params).postid });

  return (
    <div>
      <h1>Post</h1>
    </div>
  );
};

export default page;
