import { Heart, MessageCircle, MoreHorizontal, Repeat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostOutput } from "../../server/api/trpc";

type Props = PostOutput["getNewestPostsFromBoard"][number];

const Post = ({
  createdAt,
  id,
  text,
  updatedAt,
  _count,
  createdByUser,
}: Props) => {
  return (
    <div className="border-b pb-4 dark:border-gray-800">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={createdByUser.image as string | undefined}
            alt={createdByUser.name}
          />
          <AvatarFallback>{createdByUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{createdByUser.name}</span>
            <span className="text-gray-500 dark:text-gray-400">
              @{createdByUser.name}
            </span>
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <span className="text-gray-500 dark:text-gray-400">
              {createdAt.toLocaleDateString()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 rounded-full"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </div>
          <p className="mt-1 text-gray-900 dark:text-gray-50">{text}</p>
          <div className="mt-2 flex justify-between text-gray-500 dark:text-gray-400">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Reply</span>
            </Button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Like</span>
              </Button>
              {_count.likes > 0 && (
                <span className="text-xs">{_count.likes}</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
