"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { api } from "../../trpc/react";
import { authClient } from "../../lib/auth-client";

type Props = {
  initialLikes: number;
  postId: string;
  initiallyLiked: boolean;
};

export default function PostLikeButton({
  initialLikes,
  postId,
  initiallyLiked,
}: Props) {
  const likeAction = api.post.likePost.useMutation();
  const unlikeAction = api.post.unlikePost.useMutation();

  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initiallyLiked);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      unlikeAction.mutate({ postId });
    } else {
      setLikes((prev) => prev + 1);
      likeAction.mutate({ postId });
    }
    setIsLiked(!isLiked);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2"
      onClick={handleLike}
    >
      <Heart
        className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
      />
      <span>{likes}</span>
    </Button>
  );
}
