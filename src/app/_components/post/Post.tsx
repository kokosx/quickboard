"use client";

import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostLikeButton from "./PostLikeButton";
import { type PostOutput } from "../../../server/api/trpc";
import { NicknameHover } from "../user/NicknameHover";
import UserAvatar from "../user/UserAvatar";
import { useRouter } from "next/navigation";
import RepostButton from "./RepostButton";

type Props = PostOutput["getNewest"][number];

const Post = ({
  createdAt,
  id,
  text,
  updatedAt,
  _count,
  createdByUser,
  likes,
  reposts,
}: Props) => {
  const router = useRouter();
  return (
    <div
      onMouseEnter={() => router.prefetch(`/post/${id}`)}
      onClick={() => router.push(`/post/${id}`)}
      className="cursor-pointer border-b pb-4 dark:border-gray-800"
    >
      <div className="flex gap-4">
        <span className="cursor-auto" onClick={(e) => e.stopPropagation()}>
          <UserAvatar name={createdByUser.name} image={createdByUser.image} />
        </span>

        <div className="flex-1">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2"
          >
            <NicknameHover {...createdByUser} />
            {/* <span className="text-gray-500 dark:text-gray-400">
              @{createdByUser.name}
            </span> */}
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <span className="text-gray-500 dark:text-gray-400">
              {createdAt.toLocaleDateString()}
              {updatedAt.toISOString() !== createdAt.toISOString() && (
                <>
                  <span className="text-gray-500 dark:text-gray-400">·</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Edited
                  </span>
                </>
              )}
            </span>
          </div>
          <p className="mt-1 text-gray-900 dark:text-gray-50">{text}</p>
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-2 flex cursor-auto text-gray-500 dark:text-gray-400"
          >
            <PostLikeButton
              initiallyLiked={likes.length > 0}
              postId={id}
              initialLikes={_count.likes}
            />

            <Button variant="ghost" size="icon" className="w-8 rounded-full">
              <BookmarkIcon />
              <span className="sr-only">Bookmark</span>
            </Button>

            <RepostButton postId={id} isReposted={reposts.length != 0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
