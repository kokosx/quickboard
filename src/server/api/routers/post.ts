import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  addPostSchema,
  getNewestPostsSchema,
  likePostSchema,
} from "@/lib/schemas/post";
import { getSession } from "../../../lib/auth";

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

  likePost: protectedProcedure
    .input(likePostSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.postLike.create({
        data: {
          likedBy: ctx.user.id,
          likedPostId: input.postId,
        },
      });
    }),
  unlikePost: protectedProcedure
    .input(likePostSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.postLike.deleteMany({
        where: {
          AND: {
            likedBy: ctx.user.id,
            likedPostId: input.postId,
          },
        },
      });
    }),
  getBoards: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.board.findMany();
  }),
  getMostPopular: publicProcedure.query(async ({ ctx }) => {
    const session = await getSession();
    return await ctx.db.post.findMany({
      include: {
        likes: {
          where: {
            likedBy: session?.user.id,
          },
        },
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
      take: 10,
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      where: {
        createdAt: {
          //Make it so that it only shows posts from the last 24 hours
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
  }),

  getNewest: publicProcedure
    .input(getNewestPostsSchema)
    .query(async ({ ctx, input }) => {
      const withBoard = input.boardId
        ? {
            where: {
              boardId: input.boardId,
            },
          }
        : null;

      const session = await getSession();

      return await ctx.db.post.findMany({
        ...withBoard,
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
          likes: {
            where: {
              OR: [
                {
                  likedBy: session?.user.id,
                },
                { likedBy: "" },
              ],
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
