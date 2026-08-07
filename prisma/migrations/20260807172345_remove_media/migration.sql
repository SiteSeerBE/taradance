/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_tagId_fkey";

-- DropTable
DROP TABLE "Media";
