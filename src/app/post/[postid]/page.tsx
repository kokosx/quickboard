import React from "react";
import { api } from "../../../trpc/server";
import { NicknameHover } from "../../_components/user/NicknameHover";
import { notFound } from "next/navigation";
import UserAvatar from "../../_components/user/UserAvatar";
import { Button } from "../../../components/ui/button";
import PostLikeButton from "../../_components/post/PostLikeButton";
import { Bookmark, Share2 } from "lucide-react";
import CreateComment from "../../_components/post/CreateComment";
import CommentList from "../../_components/post/CommentList";

type Props = {
  params: Promise<{ postid: string }>;
};

const page = async ({ params }: Props) => {
  const post = await api.post.getPost({ postId: (await params).postid });

  if (!post) return notFound();
  return (
    <div className="mx-auto space-y-6 p-4">
      {/* Post header with user info */}
      <div className="mb-4 flex items-center space-x-3">
        <UserAvatar
          image={post.createdByUser.image}
          name={post.createdByUser.name}
        />
        <div>
          <NicknameHover {...post.createdByUser} />
          {/* <p className="text-sm text-gray-500">{formattedDate}</p> */}
        </div>
      </div>

      {/* Post content */}
      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap">{post.text}</div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-x-2">
        <PostLikeButton
          initialLikes={post._count.likes}
          initiallyLiked={post.likes.length > 0}
          postId={post.id}
        />

        <Button variant="ghost" className="flex items-center space-x-1">
          <Share2 className="h-5 w-5" />
          <span>Repost</span>
        </Button>

        <Button variant="ghost" className="flex items-center space-x-1">
          <Bookmark className="h-5 w-5" />
          <span>Bookmark</span>
        </Button>
      </div>

      {/* Comments section */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Comments
          <span className="ml-2 text-gray-500">{post._count.comments}</span>
        </h2>

        <CreateComment postId={post.id} />
        <CommentList />
      </div>
    </div>
  );
};

export default page;
