import { router } from "../trpc";
import { userRouter } from "./user";
import { chatRouter } from "./chat";

export const appRouter = router({
  chat: chatRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
