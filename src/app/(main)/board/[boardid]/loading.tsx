import React from "react";
import PostsLoading from "../../../_components/PostLoading";

const loading = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <PostsLoading amount={10} />
    </div>
  );
};

export default loading;
