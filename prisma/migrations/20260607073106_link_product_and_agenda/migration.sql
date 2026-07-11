/*
	Warnings:

	- A unique constraint covering the columns `[repeatId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "repeatId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_repeatId_key" ON "Product"("repeatId");
