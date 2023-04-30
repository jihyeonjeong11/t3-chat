"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpc = void 0;
const client_1 = require("@trpc/client");
const next_1 = require("@trpc/next");
const superjson_1 = __importDefault(require("superjson"));
const config_1 = __importDefault(require("next/config"));
const { publicRuntimeConfig } = (0, config_1.default)();
const { APP_URL, WS_URL } = publicRuntimeConfig;
const getBaseUrl = () => {
    var _a;
    if (typeof window !== "undefined")
        return ""; // browser should use relative url
    return APP_URL;
    if (process.env.NODE_ENV === "production")
        return `https://${process.env.FLY_URL}`; // SSR should use vercel url
    return `http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000}`; // dev SSR should use localhost
};
function getEndingLink(ctx) {
    if (typeof window === "undefined") {
        return (0, client_1.httpBatchLink)({
            url: `${getBaseUrl()}/api/trpc`,
            headers() {
                if (ctx === null || ctx === void 0 ? void 0 : ctx.req) {
                    // on ssr, forward client's headers to the server
                    return {
                        ...ctx.req.headers,
                        "x-ssr": "1",
                    };
                }
                return {};
            },
        });
    }
    const client = (0, client_1.createWSClient)({
        url: WS_URL,
    });
    return (0, client_1.wsLink)({
        client,
    });
}
exports.trpc = (0, next_1.createTRPCNext)({
    config({ ctx }) {
        return {
            transformer: superjson_1.default,
            links: [
                (0, client_1.loggerLink)({
                    enabled: (opts) => process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" && opts.result instanceof Error),
                }),
                getEndingLink(ctx),
            ],
        };
    },
    ssr: false,
});
