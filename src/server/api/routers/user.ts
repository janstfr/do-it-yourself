import { PrismaClient } from "@prisma/client";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { toast } from "react-toastify";

const prisma = new PrismaClient();

export const userRouter = createTRPCRouter({
  findUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        if (input.id.length > 0) {
          const user = await prisma.user.findUnique({
            where: {
              id: input.id,
            },
          });
          return user;
        }
        const user = await prisma.user.findMany();
        return user;
      } catch (error) {
        throw new TRPCError({
          message: "An error occurred while getting an user",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  createUser: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input }) => {
      console.log("input trpc", input);
      try {
        if (input.name.length > 0) {
          const user = await prisma.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: input.password,
            },
          });
          return user;
        }
        toast.error("An error occurred while creating an user");
        return false;
      } catch (error) {
        throw new TRPCError({
          message: "An error occurred while creating an user",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  changeName: publicProcedure
    .input(z.object({ userID: z.string(), newName: z.string() }))
    .mutation(async ({ input }) => {
      try {
        if (input.userID.length > 0) {
          const addLike = await prisma.user.update({
            where: {
              id: input.userID,
            },
            data: {
              name: input.newName,
            },
          });

          toast.success("Your name has been changed to " + input.newName + "!");
          return true;
        }
        toast.error(
          "An error occurred while changing your name" +
            input.newName +
            "! " +
            input.userID
        );
        return false;
      } catch (error) {
        throw new TRPCError({
          message: "An error occurred while uploading a like",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  setPassword: publicProcedure
    .input(z.object({ userID: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        if (input.userID.length > 0) {
          await prisma.user.update({
            where: {
              id: input.userID,
            },
            data: {
              password: input.password,
            },
          });

          toast.success("Your name has been changed to " + input.userID + "!");
          return true;
        }
        toast.error(
          "An error occurred while changing your name" +
            input.password +
            "! " +
            input.userID
        );
        return false;
      } catch (error) {
        throw new TRPCError({
          message: "An error occurred while uploading a like",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  deleteAllUsers: publicProcedure.mutation(async () => {
    try {
      await prisma.user.deleteMany();
      return true;
    } catch (error) {
      throw new TRPCError({
        message: "An error occurred while deleting all users",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
