/*
  Warnings:

  - You are about to drop the column `memeber` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "memeber",
ADD COLUMN     "member" BOOLEAN NOT NULL DEFAULT true;
