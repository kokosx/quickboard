import { type ReactNode } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import LayoutAside from "./LayoutAside";
import { Skeleton } from "../../../components/ui/skeleton";

export const LayoutScrollable = ({ children }: { children: ReactNode }) => {
  return <ScrollArea className="h-[calc(100vh-12rem)]">{children}</ScrollArea>;
};

export const LayoutMain = ({ children }: { children: ReactNode }) => {
  return <main className="flex flex-col gap-4">{children}</main>;
};

export const LayoutTitleBar = ({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
}) => {
  return (
    <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex max-w-[115px] flex-col gap-2 md:max-w-full md:flex-row">
        {children}
      </div>
    </div>
  );
};

export const LayoutContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto flex-1 items-start px-4 py-4 md:grid md:grid-cols-[3fr_1fr] md:gap-6 md:px-6 lg:grid-cols-[3fr_1fr]">
      {children}
    </div>
  );
};

export const AsideSkeleton = () => {
  return (
    <LayoutAside>
      <div className="flex flex-col gap-y-4">
        <Skeleton className="h-60 w-full"></Skeleton>
        <Skeleton className="h-72 w-full"></Skeleton>
      </div>
    </LayoutAside>
  );
};
