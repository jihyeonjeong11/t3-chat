"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const user_1 = require("./user");
const chat_1 = require("./chat");
exports.appRouter = (0, trpc_1.router)({
    chat: chat_1.chatRouter,
    user: user_1.userRouter,
});
