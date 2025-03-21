import { z } from "zod";

export const addPostSchema = z.object({
  text: z.string().min(5).max(300),
  board: z.string(),
});
