"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = require("@trpc/server/adapters/next");
const server_mjs_1 = require("../../../env/server.mjs");
const context_1 = require("../../../server/trpc/context");
const _app_1 = require("../../../server/trpc/router/_app");
// export API handler
exports.default = (0, next_1.createNextApiHandler)({
    router: _app_1.appRouter,
    createContext: context_1.createContext,
    onError: server_mjs_1.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
        : undefined,
});
