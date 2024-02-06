/*
  Warnings:

  - Added the required column `class` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IClass" AS ENUM ('reptiles', 'mammals', 'bird', 'insect', 'invertebrates', 'fish', 'amphibian');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "class" "IClass" NOT NULL;
