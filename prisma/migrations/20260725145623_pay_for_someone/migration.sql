/*
  Warnings:

  - The primary key for the `UserProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserProduct` table. All the data in the column will be lost.
  - Added the required column `payedByUserId` to the `UserProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payedForUserId` to the `UserProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `UserProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_userId_fkey";

-- AlterTable
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_pkey",
DROP COLUMN "userId",
ADD COLUMN     "payedByUserId" TEXT NOT NULL,
ADD COLUMN     "payedForUserId" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("payedByUserId", "payedForUserId", "productId");

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_payedByUserId_fkey" FOREIGN KEY ("payedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_payedForUserId_fkey" FOREIGN KEY ("payedForUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
