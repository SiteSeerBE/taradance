/*
  Warnings:

  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "time",
ADD COLUMN     "paying" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeEnd" TEXT,
ADD COLUMN     "timeStart" TEXT;
