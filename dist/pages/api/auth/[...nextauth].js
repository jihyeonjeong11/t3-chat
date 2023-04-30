"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
//import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const server_mjs_1 = require("../../../env/server.mjs");
const client_1 = require("../../../server/db/client");
const google_1 = __importDefault(require("next-auth/providers/google"));
exports.authOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                session.user.username = user.username;
                session.user.theme = user.theme;
            }
            return session;
        },
    },
    // Configure one or more authentication providers
    adapter: (0, prisma_adapter_1.PrismaAdapter)(client_1.prisma),
    providers: [
        // DiscordProvider({
        //   clientId: env.DISCORD_CLIENT_ID,
        //   clientSecret: env.DISCORD_CLIENT_SECRET,
        // }),
        (0, google_1.default)({
            clientId: server_mjs_1.env.GOOGLE_ID,
            clientSecret: server_mjs_1.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        // we also need email secret. find NextAuth docs for more info
        // ...add more providers here
    ],
};
exports.default = (0, next_auth_1.default)(exports.authOptions);
