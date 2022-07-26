import { t } from "../utils";
import { z } from "zod";

import { authedProcedure } from "../utils";

export const exerciseRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        workoutId: z.string(),
        name: z.string(),
        sets: z.number().min(1).max(100),
        reps: z.number().min(1).max(100),
        weight: z.number().min(1).max(500),
        rest: z.number().min(1).max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { workoutId, name, sets, reps, weight, rest } = input;

      const exercise = await prisma?.exercise.create({
        data: {
          workoutId,
          name,
          sets,
          reps,
          weight,
          rest,
        },
      });

      return {
        exercise,
      };
    }),
  delete: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const exercise = await ctx.prisma.exercise.delete({
        where: {
          id,
        },
      });

      return {
        exercise,
      };
    }),
  edit: authedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        sets: z.number().min(1).max(100).nullable(),
        reps: z.number().min(1).max(100).nullable(),
        weight: z.number().min(1).max(500).nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, sets, reps } = input;

      const exercise = await ctx.prisma.exercise.update({
        where: {
          id,
        },
        data: {
          name: name ?? undefined,
          sets: sets ?? undefined,
          reps: reps ?? undefined,
        },
      });

      return {
        exercise,
      };
    }),
  getAll: authedProcedure
    .input(
      z.object({
        workoutId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { workoutId } = input;
      const exercises = await prisma?.exercise.findMany({
        where: {
          workoutId,
        },
      });
      return {
        exercises,
      };
    }),
  getById: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const exercise = await ctx.prisma.exercise.findUnique({
        where: {
          id,
        },
      });
      return {
        exercise,
      };
    }),
  deleteAll: authedProcedure
    .input(z.object({ workoutId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { workoutId } = input;
      const exercises = await ctx.prisma.exercise.deleteMany({
        where: {
          workoutId,
        },
      });
      return {
        exercises,
      };
    }),
});
