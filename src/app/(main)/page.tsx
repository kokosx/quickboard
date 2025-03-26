import React from "react";
import { api } from "../../trpc/server";
import PostList from "../_components/PostList";

const page = async () => {
  const posts = await api.post.getNewest({});
  console.log(posts);
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default page;
