/*
  Warnings:

  - You are about to drop the column `menuId` on the `Page` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_menuId_fkey";

-- DropIndex
DROP INDEX "Page_menuId_key";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "contentPath" TEXT;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "menuId";
