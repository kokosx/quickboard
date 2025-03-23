"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  path: string[];
};

const ConditionalDisplay = ({ children, path }: Props) => {
  const pathname = usePathname();
  console.log(pathname);
  if (path.includes(pathname)) {
    return children;
  }
  return null;
};

export default ConditionalDisplay;
