import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { addPostSchema, getPostsByBoardSchema } from "@/lib/schemas/post";
import { getSession } from "@/lib/auth";

export const postRouter = createTRPCRouter({
  add: protectedProcedure
    .input(addPostSchema)
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.db.post.create({
        data: {
          text: input.text,
          boardId: input.board,
          createdBy: ctx.user.id,
        },
      });
      return post;
    }),
  getBoards: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.board.findMany();
  }),
  getNewestPostsFromBoard: publicProcedure
    .input(getPostsByBoardSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.post.findMany({
        where: {
          boardId: input.boardId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        include: {
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
          createdByUser: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }),
});
