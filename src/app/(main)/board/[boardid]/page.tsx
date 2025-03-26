import React from "react";
import { api } from "../../../../trpc/server";
import PostList from "../../../_components/PostList";
import { delay } from "../../../../lib/utils";

const page = async () => {
  await delay(5000);

  const posts = await api.post.getNewestPostsFromBoard({
    boardId: "9cc9e04d-525e-4570-bcd0-570383520abf",
  });

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default page;
