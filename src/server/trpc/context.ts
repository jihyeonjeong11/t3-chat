import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";

import { prisma } from "../db/client";
import type { IncomingMessage } from "http";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/dist/adapters/node-http";
import { getSession } from "next-auth/react";
import type ws from "ws";
import { ee } from "../wsServer/eventEmitter";

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    ee,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts:
    | CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>
) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  // check url below:
  // https://next-auth.js.org/configuration/nextjs#unstable_getserversession
  // in serverside, use unstable_getServerSession to reduce extra fetch to an API Route.
  //but it's still experimental so in this proj we gonna use getSession and add extra api to out route.

  //const session = await unstable_getServerSession();
  const session = await getSession({ req });

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
