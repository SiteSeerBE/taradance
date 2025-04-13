/*
  Warnings:

  - You are about to drop the column `role` on the `Role` table. All the data in the column will be lost.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "RoleType" ADD VALUE 'DANCER';

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "role",
ADD COLUMN     "name" "RoleType" NOT NULL;
