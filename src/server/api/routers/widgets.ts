import { PrismaClient } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const prisma = new PrismaClient();

export const dbRouter = createTRPCRouter({
  createWidget: publicProcedure
    .input(z.object({ name: z.string(), price: z.string() }))
    .mutation(async ({ input }) => {
      try {
        console.log("input", input);
        const user = await prisma.widget.create({
          data: {
            name: input.name,
            price: +input.price,
          },
        });
      } catch (error) {
        throw new TRPCError({
          message: "An error occurred while sending a password reset mail",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  findWidgets: publicProcedure.query(async () => {
    console.log("widgets werden gesucht..");
    try {
      const widgets = await prisma.widget.findMany();
      return widgets;
    } catch (error) {
      throw new TRPCError({
        message: "An error occurred while sending a password reset mail",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
