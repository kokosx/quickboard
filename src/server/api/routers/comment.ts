import { createCommentSchema } from "../../../lib/schemas/post";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.postComment.create({
        data: {
          text: input.text,
          postId: input.postId,
          createdBy: ctx.user.id,
        },
      });
      return comment;
    }),
  getUsersComments: protectedProcedure.mutation(async ({ ctx }) => {
    const comments = await ctx.db.postComment.findMany({
      where: {
        createdBy: ctx.user.id,
      },
      include: {
        createdByUser: true,
      },
    });
    return comments;
  }),
  getComments: publicProcedure.mutation(async ({ ctx }) => {
    const comments = await ctx.db.postComment.findMany({
      include: {
        createdByUser: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return comments;
  }),
});
