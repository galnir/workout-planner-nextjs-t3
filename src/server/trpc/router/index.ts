// src/server/trpc/router/index.ts
import { t } from "../utils";
import { workoutsRouter } from "./workouts";
import { exerciseRouter } from "./exercise";
import { authRouter } from "./auth";

export const appRouter = t.router({
  workout: workoutsRouter,
  exercise: exerciseRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
