import WhoToFollow from "../_components/layout/WhoToFollow";
import LayoutAside from "../_components/layout/LayoutAside";
import TrendsForYou from "../_components/layout/TrendsForYou";
import { Suspense, type ReactNode } from "react";
import CreatePost from "../_components/post/CreatePost";
import { api } from "@/trpc/server";
import BoardNavigation from "../_components/BoardNavigation";
import PostSorting from "../_components/post/PostSorting";
import {
  AsideSkeleton,
  LayoutContainer,
  LayoutMain,
  LayoutScrollable,
  LayoutTitleBar,
} from "../_components/layout/Layout";

const layout = async ({ children }: { children: ReactNode }) => {
  const boards = await api.post.getBoards();

  return (
    <LayoutContainer>
      <LayoutMain>
        <LayoutTitleBar title="Home">
          <PostSorting />
          <BoardNavigation boards={boards} />
        </LayoutTitleBar>
        <CreatePost boards={boards} />
        <LayoutScrollable>{children}</LayoutScrollable>
      </LayoutMain>
      <Suspense fallback={<AsideSkeleton />}>
        <LayoutAside>
          <WhoToFollow />
          <TrendsForYou />
        </LayoutAside>
      </Suspense>
    </LayoutContainer>
  );
};

export default layout;
