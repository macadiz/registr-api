/*
  Warnings:

  - A unique constraint covering the columns `[email,group_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `user_email_key` ON `user`;

-- DropIndex
DROP INDEX `user_username_key` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `user_email_group_id_key` ON `user`(`email`, `group_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_username_key` ON `user`(`email`, `username`);
