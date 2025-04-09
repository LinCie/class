/*
  Warnings:

  - Added the required column `number` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "class" TEXT,
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "major" TEXT,
ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "faculty" TEXT;
