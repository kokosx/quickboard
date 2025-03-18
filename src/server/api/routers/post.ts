import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { addPostSchema } from "@/lib/schemas/post";

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
});
