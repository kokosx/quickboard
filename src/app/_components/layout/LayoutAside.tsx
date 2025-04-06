import { type ReactNode } from "react";

const LayoutAside = ({ children }: { children: ReactNode }) => {
  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] lg:block">
      {children}
    </aside>
  );
};

export default LayoutAside;
