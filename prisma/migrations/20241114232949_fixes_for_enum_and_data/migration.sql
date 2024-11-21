/*
  Warnings:

  - You are about to drop the column `location_id` on the `lesson` table. All the data in the column will be lost.
  - The values [Studend] on the enum `user_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `lesson` DROP COLUMN `location_id`;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('Teacher', 'Student') NULL;
