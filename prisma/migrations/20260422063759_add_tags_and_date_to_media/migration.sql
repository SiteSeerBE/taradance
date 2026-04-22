/*
  Warnings:

  - You are about to drop the column `content` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Media` table. All the data in the column will be lost.
  - Added the required column `date` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "content",
DROP COLUMN "orderId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tagId" INTEGER;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
