"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = __importDefault(require("zod"));
exports.userRouter = (0, trpc_1.router)({
    getSession: trpc_1.publicProcedure.query(({ ctx }) => {
        return ctx.session;
    }),
    getSecretMessage: trpc_1.protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
    changeUserData: trpc_1.protectedProcedure
        .input(zod_1.default.object({
        name: zod_1.default.string().nullish(),
        username: zod_1.default.string().nullish(),
        image: zod_1.default.string().nullish(),
    }))
        .mutation(({ input: { username, name, image }, ctx }) => {
        return ctx.prisma.user.update({
            where: {
                id: ctx.session.user.id,
            },
            data: {
                name,
                username,
                image,
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
            },
        });
    }),
    changeUserTheme: trpc_1.protectedProcedure
        .input(zod_1.default.object({ theme: zod_1.default.enum(["light", "dark"]) }))
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
    users: trpc_1.protectedProcedure
        .input(zod_1.default.object({ user: zod_1.default.string() }))
        .query(({ input: { user }, ctx }) => {
        return ctx.prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: user,
                            mode: "insensitive",
                        },
                        username: {
                            contains: user,
                            mode: "insensitive",
                        },
                    },
                ],
                NOT: { id: ctx.session.user.id }, // don't want to return myself.
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
            },
        });
    }),
});
// usermodel is all nullish because it can be freely changed
// also, prisma does not update undefined values, so empty value must be null.
