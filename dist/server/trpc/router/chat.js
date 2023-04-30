"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const observable_1 = require("@trpc/server/observable");
exports.chatRouter = (0, trpc_1.router)({
    hello: trpc_1.publicProcedure
        .input(zod_1.z.object({ text: zod_1.z.string().nullish() }).nullish())
        .query(({ input }) => {
        var _a;
        return {
            greeting: `Hello ${(_a = input === null || input === void 0 ? void 0 : input.text) !== null && _a !== void 0 ? _a : "world"}`,
        };
    }),
    getAll: trpc_1.publicProcedure.query(({ ctx }) => {
        return ctx.prisma.example.findMany();
    }),
    conversations: trpc_1.protectedProcedure.query(async ({ ctx }) => {
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
    findConversation: trpc_1.protectedProcedure
        .input(zod_1.z.object({ userId: zod_1.z.string() }))
        .query(async ({ input: { userId }, ctx }) => {
        var _a;
        // pseudo process
        // user1 has two conversations: [c1, c2]
        // user2 has one conversation: [c1]
        // [{c1: u2, c2: u1}, {c2: u1}]
        // c1: u2 return c1.
        const conversationUsers = await ctx.prisma.conversationUser.groupBy({
            by: ["conversationId"],
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
            ? (_a = conversationUsers[0]) === null || _a === void 0 ? void 0 : _a.conversationId
            : null;
    }),
    messages: trpc_1.protectedProcedure
        .input(zod_1.z.object({ conversationId: zod_1.z.string() }))
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
    changeUserTheme: trpc_1.protectedProcedure
        .input(zod_1.z.object({ theme: zod_1.z.enum(["light", "dark"]) }))
        .mutation(({ input: { theme }, ctx }) => {
        return ctx.prisma.user.update({
            data: {
                theme,
            },
            where: {
                id: ctx.session.user.id,
            },
            select: {
                id: true,
                theme: true,
            },
        });
    }),
    sendMessage: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        conversationId: zod_1.z.string().nullish(),
        messageText: zod_1.z.string(),
        userId: zod_1.z.string().nullish(),
    }))
        .mutation(async ({ input: { messageText, conversationId, userId }, ctx }) => {
        // messageText: chatting content
        // conversationId: conversation record id
        // userId: user Id
        // ctx: ctx.session.userId logon userid
        if (!conversationId) {
            if (!userId) {
                throw new Error("No recipient passes");
            }
            return ctx.prisma.$transaction(async (trx) => {
                const conversation = await trx.conversation.create({
                    // 1. if conversationId not passed, creates new Message row and new conversation
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
                    // updates conversation record with the new message id as the lastMessageId
                    data: {
                        lastMessageId: conversation.messages[0].id,
                    },
                    where: {
                        id: conversation.id,
                    },
                });
                ctx.ee.emit("sendMessage", {
                    conversationId: conversation.id,
                    userId,
                });
                return conversation;
            });
        }
        //
        await ctx.prisma.$transaction(async (trx) => {
            // if conversationId passed,
            // that means we already have conversation and conversationUsers
            //
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
                // and update new message id as lastMessageId
                data: {
                    lastMessageId: message.id,
                },
                where: {
                    id: conversationId,
                },
            });
        });
        // if conversationId passed (case 2 outside of if block)
        // we need to find user after we create conversation record.
        // because we don't create new conversationUser hence it already exists.
        const user = await ctx.prisma.conversationUser.findFirst({
            where: {
                conversationId,
                NOT: {
                    userId: ctx.session.user.id,
                },
            },
            select: {
                userId: true,
            },
        });
        ctx.ee.emit("sendMessage", { conversationId, userId: user.userId });
        // finally we call onSendMessage callback
    }),
    onSendMessage: trpc_1.protectedProcedure.subscription(({ ctx }) => {
        return (0, observable_1.observable)((emit) => {
            // server subscripts db changes and returns conversationId
            const onSendMessage = (data) => {
                if (data.userId === ctx.session.user.id) {
                    // if same user id
                    emit.next({ conversationId: data.conversationId }); // event Emitter pass conversationId
                }
            };
            ctx.ee.on("sendMessage", onSendMessage); // when sendMessage event happens, trigger onSendMessageCallback
            return () => {
                ctx.ee.on("sendMessage", onSendMessage);
            };
        });
    }),
});
