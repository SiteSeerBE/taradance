/*
  Warnings:

  - The primary key for the `UserProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `logtoId` on the `UserProduct` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_logtoId_fkey";

-- AlterTable
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_pkey",
DROP COLUMN "logtoId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("userId", "productId");

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
