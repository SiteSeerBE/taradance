/*
  Warnings:

  - You are about to drop the column `locationId` on the `Home` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "locationId",
ADD COLUMN     "imagePath" TEXT NOT NULL;
