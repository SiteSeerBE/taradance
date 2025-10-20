/*
  Warnings:

  - Made the column `contentPath` on table `Menu` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "contentPath" SET NOT NULL;
