/*
  Warnings:

  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_authorId_fkey";

-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_pageId_fkey";

-- DropTable
DROP TABLE "content";

-- CreateTable
CREATE TABLE "part" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mediaLocation" INTEGER NOT NULL DEFAULT 0,
    "mediaPath" TEXT,
    "orderId" INTEGER NOT NULL DEFAULT 100,
    "pageId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "part_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "part" ADD CONSTRAINT "part_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part" ADD CONSTRAINT "part_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
