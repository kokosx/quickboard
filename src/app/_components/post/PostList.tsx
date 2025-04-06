import { type PostOutput } from "../../../server/api/trpc";
import Post from "./Post";

type Props = {
  posts: PostOutput["getNewest"];
};

const PostList = ({ posts }: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
