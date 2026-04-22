/*
  Warnings:

  - Added the required column `imagePath` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "imagePath" TEXT NOT NULL;
