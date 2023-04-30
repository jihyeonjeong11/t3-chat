"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.createContextInner = void 0;
const client_1 = require("../db/client");
const react_1 = require("next-auth/react");
const eventEmitter_1 = require("../wsServer/eventEmitter");
/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
const createContextInner = async (opts) => {
    return {
        session: opts.session,
        prisma: client_1.prisma,
        ee: eventEmitter_1.ee,
    };
};
exports.createContextInner = createContextInner;
/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
const createContext = async (opts) => {
    const { req, res } = opts;
    // Get the session from the server using the unstable_getServerSession wrapper function
    // check url below:
    // https://next-auth.js.org/configuration/nextjs#unstable_getserversession
    // in serverside, use unstable_getServerSession to reduce extra fetch to an API Route.
    //but it's still experimental so in this proj we gonna use getSession and add extra api to out route.
    //const session = await unstable_getServerSession();
    const session = await (0, react_1.getSession)({ req });
    return await (0, exports.createContextInner)({
        session,
    });
};
exports.createContext = createContext;
