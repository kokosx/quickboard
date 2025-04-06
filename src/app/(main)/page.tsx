import React from "react";
import { api } from "../../trpc/server";

import { type PostOutput } from "../../server/api/trpc";
import PostList from "../_components/post/PostList";

type Props = {
  searchParams: Promise<{
    sort?: string;
  }>;
};

const page = async ({ searchParams }: Props) => {
  let posts: PostOutput["getMostPopular"] = [];
  if ((await searchParams).sort === "most-popular") {
    posts = await api.post.getMostPopular({});
  } else {
    posts = await api.post.getNewest({});
  }

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default page;
