import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  addPostSchema,
  getNewestPostsSchema,
  getPopularPostsSchema,
  getPostSchema,
  likePostSchema,
  repostPostSchema,
} from "@/lib/schemas/post";
import { getSession } from "../../../lib/auth";

export const postRouter = createTRPCRouter({
  getPost: publicProcedure
    .input(getPostSchema)
    .query(async ({ ctx, input }) => {
      const session = await getSession();
      return await ctx.db.post.findFirst({
        where: {
          id: input.postId,
        },
        include: {
          createdByUser: {
            select: {
              name: true,
              image: true,
              id: true,
              bio: true,
              createdAt: true,
            },
          },
          comments: {
            select: {
              createdAt: true,
              createdBy: true,
              createdByUser: {
                select: {
                  name: true,
                  image: true,
                  id: true,
                  bio: true,
                },
              },
              text: true,
              id: true,
            },
          },

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
        },
      });
    }),
  repost: protectedProcedure
    .input(repostPostSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.repost.create({
        data: {
          repostedBy: ctx.user.id,
          repostedPostId: input.postId,
        },
      });
    }),
  unrepost: protectedProcedure
    .input(repostPostSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.repost.deleteMany({
        where: {
          AND: [
            {
              repostedBy: ctx.user.id,
            },
            {
              repostedPostId: input.postId,
            },
          ],
        },
      });
    }),
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
  getMostPopular: publicProcedure
    .input(getPopularPostsSchema)
    .query(async ({ ctx, input }) => {
      const session = await getSession();
      return await ctx.db.post.findMany({
        include: {
          likes: {
            where: {
              likedBy: session?.user.id,
            },
          },
          reposts: {
            where: {
              OR: [
                {
                  repostedBy: session?.user.id,
                },
                { repostedBy: "" },
              ],
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
              id: true,
              bio: true,
              createdAt: true,
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

          boardId: input.boardId ?? undefined,
        },
      });
    }),

  getNewest: publicProcedure
    .input(getNewestPostsSchema)
    .query(async ({ ctx, input }) => {
      const session = await getSession();

      return await ctx.db.post.findMany({
        where: {
          boardId: input.boardId ?? undefined,
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
          reposts: {
            where: {
              OR: [
                {
                  repostedBy: session?.user.id,
                },
                { repostedBy: "" },
              ],
            },
          },
          createdByUser: {
            select: {
              name: true,
              image: true,
              id: true,
              bio: true,
              createdAt: true,
            },
          },
        },
      });
    }),
});
