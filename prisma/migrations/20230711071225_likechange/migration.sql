/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" STRING[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "likes" STRING[];

-- DropTable
DROP TABLE "Like";
