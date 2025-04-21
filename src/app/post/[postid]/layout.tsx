import WhoToFollow from "../../_components/layout/WhoToFollow";
import LayoutAside from "../../_components/layout/LayoutAside";
import TrendsForYou from "../../_components/layout/TrendsForYou";
import { Suspense, type ReactNode } from "react";
import { api } from "@/trpc/server";

import {
  AsideSkeleton,
  LayoutContainer,
  LayoutMain,
  LayoutScrollable,
  LayoutTitleBar,
} from "../../_components/layout/Layout";

type Props = {
  params: Promise<{
    postid: string;
  }>;
  children: ReactNode;
};

const layout = async ({ children, params }: Props) => {
  const post = await api.post.getPost({ postId: (await params).postid });

  return (
    <LayoutContainer>
      <LayoutMain>
        <LayoutTitleBar
          title={`${post?.createdByUser.name}'s post`}
        ></LayoutTitleBar>

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
