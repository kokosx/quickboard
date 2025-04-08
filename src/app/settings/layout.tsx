import { type PropsWithChildren } from "react";
import {
  LayoutContainer,
  LayoutMain,
  LayoutScrollable,
  LayoutTitleBar,
} from "../_components/layout/Layout";
import { getSession } from "../../lib/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: PropsWithChildren) => {
  const s = await getSession();
  const user = s?.user;
  if (!user) {
    redirect("/");
  }
  return (
    <LayoutContainer>
      <LayoutMain>
        <LayoutTitleBar title="Settings"></LayoutTitleBar>
        <LayoutScrollable>{children}</LayoutScrollable>
      </LayoutMain>
    </LayoutContainer>
  );
};

export default layout;
