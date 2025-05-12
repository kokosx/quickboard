"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { api } from "../../../trpc/react";
import { toast } from "sonner";
import { ShareIcon } from "lucide-react";

type Props = {
  postId: string;
  isReposted: boolean;
};

const RepostButton = ({ postId, isReposted }: Props) => {
  const [_isReposted, _setIsReposted] = useState(isReposted);
  const { mutate: repostMutate, isPending: isReposting } =
    api.post.repost.useMutation({
      onSuccess: () => {
        toast("Reposted!");
      },
      onError: () => {
        toast("An error occured!");
      },
    });

  const { mutate: unrepostMutate, isPending: isRemoving } =
    api.post.unrepost.useMutation({});

  const repost = () => {
    if (_isReposted) {
      unrepostMutate({ postId });
      _setIsReposted(false);
    } else {
      repostMutate({ postId });
      _setIsReposted(true);
    }
  };
  return (
    <Button
      onClick={repost}
      disabled={isReposting || isRemoving}
      variant="ghost"
      className="clear-start rounded-full"
    >
      {_isReposted ? "Remove repost" : "Repost"}
      <ShareIcon />
      <span className="sr-only">
        {_isReposted ? "Remove repost" : "Repost"}
      </span>
    </Button>
  );
};

export default RepostButton;
