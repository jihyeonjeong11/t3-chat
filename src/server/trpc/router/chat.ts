import { string, z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const chatRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  conversations: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.conversationUser.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        conversation: {
          include: {
            conversationUsers: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    username: true,
                  },
                },
              },
            },
            lastMessage: true,
          },
        },
      },
      orderBy: {
        conversation: {
          lastMessageId: "desc",
        },
      },
    });
  }),
  findConversation: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId }, ctx }) => {
      // pseudo process
      // user1 has two conversations: [c1, c2]
      // user2 has one conversation: [c1]
      // [{c1: u2, c2: u1}, {c2: u1}]
      // c1: u2 return c1.
      const conversationUsers = await ctx.prisma.conversationUser.groupBy({
        by: ["conversationId"], // grouped by conversationId
        where: {
          userId: {
            in: [userId, ctx.session.user.id], // find conversationUser has those ids
          },
        },
        having: {
          userId: {
            _count: {
              equals: 2, // need Two userId
            },
          },
        },
      });
      return conversationUsers.length
        ? conversationUsers[0]?.conversationId
        : null;
    }),
  messages: protectedProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ input: { conversationId }, ctx }) => {
      await ctx.prisma.conversationUser.findUniqueOrThrow({
        where: {
          userId_conversationId: {
            userId: ctx.session.user.id,
            conversationId,
          },
        },
      });
      return ctx.prisma.message.findMany({
        where: {
          conversationId,
        },
        orderBy: {
          id: "asc",
        },
      });
    }),
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.string().nullish(),
        messageText: z.string(),
        userId: z.string().nullish(),
      })
    )
    .mutation(
      async ({ input: { messageText, conversationId, userId }, ctx }) => {
        if (!conversationId) {
          if (!userId) {
            throw new Error("No recipient passes");
          }
          // transaction ? two db updates at one api
          return ctx.prisma.$transaction(async (trx) => {
            const conversation = await trx.conversation.create({
              data: {
                messages: {
                  create: {
                    messageText,
                    userId: ctx.session.user.id,
                  },
                },
                conversationUsers: {
                  createMany: {
                    data: [{ userId }, { userId: ctx.session.user.id }],
                  },
                },
              },
              include: {
                messages: true,
              },
            });
            trx.conversation.update({
              data: {
                lastMessageId: conversation.messages[0]!.id,
              },
              where: {
                id: conversation.id,
              },
            });

            await ctx.prisma.$transaction(async (trx) => {
              const [message] = await Promise.all([
                trx.message.create({
                  data: {
                    messageText,
                    userId: ctx.session.user.id,
                    conversationId,
                  },
                }),
                trx.conversationUser.findUniqueOrThrow({
                  where: {
                    userId_conversationId: {
                      userId: ctx.session.user.id,
                      conversationId,
                    },
                  },
                }),
              ]);

              await trx.conversation.update({
                data: {
                  lastMessageId: message.id,
                },
                where: {
                  id: conversation.id,
                },
              });
            });

            // we want to return conversation itself
          });
        }
      }
    ),
});
