import React from "react";
import { api } from "../../../trpc/server";
import Comment from "./Comment";

const CommentList = async () => {
  const comments = await api.comment.getComments();
  return (
    <div className="mt-2 flex flex-col gap-y-2">
      {comments.map((el) => (
        <Comment key={el.id} comment={el} />
      ))}
    </div>
  );
};

export default CommentList;
