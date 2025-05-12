import { type RouterOutputs } from "../../../trpc/react";
import { Card, CardContent } from "@/components/ui/card";

import UserAvatar from "../user/UserAvatar";
import { NicknameHover } from "../user/NicknameHover";

type Props = {
  comment: RouterOutputs["comment"]["getComments"][0];
};

const Comment = ({ comment }: Props) => {
  return (
    <Card className="mb-3 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <UserAvatar
            image={comment.createdByUser.image}
            name={comment.createdByUser.name}
          />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <NicknameHover {...comment.createdByUser} />
              <span className="text-xs text-muted-foreground">
                {comment.createdAt.toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-sm">{comment.text}</p>
          </div>
        </div>
      </CardContent>

      {/* <CardFooter className="px-4 pb-3 pt-0">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="flex h-7 items-center gap-1 px-2"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>Like</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex h-7 items-center gap-1 px-2"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Reply</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="ml-auto flex h-7 items-center gap-1 px-2"
          >
            <Flag className="h-3.5 w-3.5" />
            <span>Report</span>
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default Comment;
