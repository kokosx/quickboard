"use server";

import { revalidatePath } from "next/cache";

export const revalidateAction = async (
  path: string,
  type: "page" | "layout",
) => {
  revalidatePath(path, type);
};
