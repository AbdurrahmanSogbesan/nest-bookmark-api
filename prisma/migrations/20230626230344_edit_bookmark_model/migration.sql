/*
  Warnings:

  - You are about to drop the column `Description` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
