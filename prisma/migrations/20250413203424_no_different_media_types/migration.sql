/*
  Warnings:

  - You are about to drop the column `mediaType` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `quote` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "mediaType",
DROP COLUMN "quote";
