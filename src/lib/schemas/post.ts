import { z } from "zod";

export const addPostSchema = z.object({
  text: z.string().min(5).max(300),
  board: z.string(),
});

export const getPostSchema = z.object({
  postId: z.string(),
});

export const getNewestPostsSchema = z.object({
  boardId: z.string().optional(),
});

export const getPopularPostsSchema = z.object({
  boardId: z.string().optional(),
});

export const likePostSchema = z.object({
  postId: z.string(),
});

export const createCommentSchema = z.object({
  text: z.string().min(5).max(300),
  postId: z.string(),
});

export const repostPostSchema = z.object({
  postId: z.string(),
});
