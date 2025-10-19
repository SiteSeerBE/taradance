/*
  Warnings:

  - You are about to drop the `part` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "part" DROP CONSTRAINT "part_authorId_fkey";

-- DropForeignKey
ALTER TABLE "part" DROP CONSTRAINT "part_pageId_fkey";

-- DropTable
DROP TABLE "part";

-- CreateTable
CREATE TABLE "Part" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mediaLocation" INTEGER NOT NULL DEFAULT 0,
    "mediaPath" TEXT,
    "orderId" INTEGER NOT NULL DEFAULT 100,
    "pageId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
