/*
  Warnings:

  - Added the required column `status` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ALIVE', 'DECEASED', 'SOLD', 'FOR_SALE');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "status" "Status" NOT NULL;
