import { ScrollArea } from "@/components/ui/scroll-area";
import WhoToFollow from "./../_components/WhoToFollow";
import LayoutAside from "./../_components/LayoutAside";
import TrendsForYou from "./../_components/TrendsForYou";
import { Suspense, type ReactNode } from "react";
import CreatePost from "../_components/CreatePost";
import { getSession } from "@/lib/auth";
import { api } from "@/trpc/server";
import BoardNavigation from "../_components/BoardNavigation";
import { Skeleton } from "@/components/ui/skeleton";
import PostSorting from "../_components/PostSorting";
import UserProvider from "../_components/UserProvider";

const layout = async ({ children }: { children: ReactNode }) => {
  const s = await getSession();
  const user = s?.user;
  const boards = await api.post.getBoards();

  return (
    <UserProvider user={user}>
      <div className="container mx-auto flex-1 items-start px-4 py-4 md:grid md:grid-cols-[3fr_1fr] md:gap-6 md:px-6 lg:grid-cols-[3fr_1fr]">
        <main className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
            <h1 className="text-xl font-bold">Home</h1>
            <div className="flex gap-x-2">
              <PostSorting />
              <BoardNavigation boards={boards} />
            </div>
          </div>

          {/* <ConditionalDisplay path={["/"]}> */}
          <CreatePost boards={boards} user={user} />
          {/* </ConditionalDisplay> */}
          <ScrollArea className="h-[calc(100vh-12rem)]">{children}</ScrollArea>
        </main>
        <Suspense fallback={<AsideSkeleton />}>
          <AsideContent />
        </Suspense>
        {/* <LayoutAside>
        <WhoToFollow />
        <TrendsForYou />
      </LayoutAside> */}
      </div>
    </UserProvider>
  );
};

export default layout;

const AsideContent = async () => {
  return (
    <LayoutAside>
      <WhoToFollow />
      <TrendsForYou />
    </LayoutAside>
  );
};

const AsideSkeleton = () => {
  return (
    <LayoutAside>
      <div className="flex flex-col gap-y-4">
        <Skeleton className="h-60 w-full"></Skeleton>
        <Skeleton className="h-72 w-full"></Skeleton>
      </div>
    </LayoutAside>
  );
};
