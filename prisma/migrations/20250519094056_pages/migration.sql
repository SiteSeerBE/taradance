/*
  Warnings:

  - You are about to drop the column `content` on the `Page` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[menuId]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "content",
ADD COLUMN     "menuId" INTEGER;

-- DropEnum
DROP TYPE "Calendar";

-- DropEnum
DROP TYPE "MediaType";

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "orderId" INTEGER NOT NULL DEFAULT 0,
    "parentId" INTEGER,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT,
    "contentText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mediaLocation" INTEGER NOT NULL DEFAULT 0,
    "mediaPath" TEXT,
    "orderId" INTEGER NOT NULL DEFAULT 100,
    "pageId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_menuId_key" ON "Page"("menuId");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
