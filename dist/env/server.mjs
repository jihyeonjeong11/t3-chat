"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
const schema_mjs_1 = require("./schema.mjs");
const client_mjs_1 = require("./client.mjs");
const _serverEnv = schema_mjs_1.serverSchema.safeParse(process.env);
if (!_serverEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...(0, client_mjs_1.formatErrors)(_serverEnv.error.format())
  );
  throw new Error("Invalid environment variables");
}
for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("❌ You are exposing a server-side env-variable:", key);
    throw new Error("You are exposing a server-side env-variable");
  }
}
exports.env = { ..._serverEnv.data, ...client_mjs_1.env };
