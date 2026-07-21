/*
  Warnings:

  - The primary key for the `UserProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserProduct` table. All the data in the column will be lost.
  - Added the required column `logtoId` to the `UserProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_userId_fkey";

-- AlterTable
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_pkey",
DROP COLUMN "userId",
ADD COLUMN     "logtoId" TEXT NOT NULL,
ADD CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("logtoId", "productId");

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_logtoId_fkey" FOREIGN KEY ("logtoId") REFERENCES "User"("logtoId") ON DELETE CASCADE ON UPDATE CASCADE;
