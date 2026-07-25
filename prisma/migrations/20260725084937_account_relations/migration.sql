/*
  Warnings:

  - You are about to drop the `UserRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRelation" DROP CONSTRAINT "UserRelation_childId_fkey";

-- DropForeignKey
ALTER TABLE "UserRelation" DROP CONSTRAINT "UserRelation_parentId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "parentAccountId" TEXT;

-- DropTable
DROP TABLE "UserRelation";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_parentAccountId_fkey" FOREIGN KEY ("parentAccountId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
