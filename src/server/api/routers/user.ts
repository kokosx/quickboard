import { editUserSchema, getUserInfoSchema } from "../../../lib/schemas/user";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  edit: protectedProcedure
    .input(editUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        data: {
          bio: input.bio,
          name: input.name,
          image: input.avatar,
        },
        where: {
          id: ctx.user.id,
        },
      });
    }),
  getUserInfo: protectedProcedure
    .input(getUserInfoSchema)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
      });
      return user;
    }),
});
