/*
  Warnings:

  - Added the required column `title` to the `academic_semesters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "academic_semesters" ADD COLUMN     "title" TEXT NOT NULL;
