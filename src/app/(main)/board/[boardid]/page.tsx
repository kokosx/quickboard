import { api } from "@/trpc/server";

import { type PostOutput } from "../../../../server/api/trpc";
import PostList from "../../../_components/post/PostList";

type Props = {
  searchParams: Promise<{
    sort?: string;
  }>;
  params: Promise<{ boardid: string }>;
};

const page = async ({ params, searchParams }: Props) => {
  let posts: PostOutput["getMostPopular"] = [];
  const boardId = (await params).boardid;
  if ((await searchParams).sort === "most-popular") {
    posts = await api.post.getMostPopular({ boardId });
  } else {
    posts = await api.post.getNewest({ boardId });
  }

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default page;
