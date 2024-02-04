/*
  Warnings:

  - You are about to drop the column `classId` on the `Species` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Species" DROP CONSTRAINT "Species_classId_fkey";

-- DropIndex
DROP INDEX "Species_classId_key";

-- AlterTable
ALTER TABLE "Species" DROP COLUMN "classId";

-- DropTable
DROP TABLE "Class";
