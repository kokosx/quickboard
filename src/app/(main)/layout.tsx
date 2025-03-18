import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import WhoToFollow from "./../_components/WhoToFollow";
import LayoutAside from "./../_components/LayoutAside";
import TrendsForYou from "./../_components/TrendsForYou";
import { type ReactNode } from "react";
import ConditionalDisplay from "../_components/ConditionalDisplay";
import CreatePost from "../_components/CreatePost";
import { getSession } from "../../lib/auth";

const layout = async ({ children }: { children: ReactNode }) => {
  const s = await getSession();
  const user = s?.user;
  return (
    <div className="container mx-auto flex-1 items-start px-4 py-4 md:grid md:grid-cols-[3fr_1fr] md:gap-6 md:px-6 lg:grid-cols-[3fr_1fr]">
      <main className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
          <h1 className="text-xl font-bold">Home</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Star className="h-5 w-5" />
            <span className="sr-only">Top Posts</span>
          </Button>
        </div>
        <ConditionalDisplay path={["/"]}>
          <CreatePost user={user} />
        </ConditionalDisplay>
        <ScrollArea className="h-[calc(100vh-12rem)]">{children}</ScrollArea>
      </main>
      <LayoutAside>
        <WhoToFollow />
        <TrendsForYou />
      </LayoutAside>
    </div>
  );
};

export default layout;
