"use client";

import {
  LayoutContainer,
  LayoutMain,
  LayoutTitleBar,
} from "../_components/layout/Layout";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <LayoutContainer>
      <LayoutMain>
        <LayoutTitleBar title="Not found"></LayoutTitleBar>
        Post has not been found
        <div>
          <Button onClick={() => router.back()}>Go back</Button>
        </div>
      </LayoutMain>
    </LayoutContainer>
  );
};

export default NotFound;
