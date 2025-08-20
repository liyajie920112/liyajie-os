/*
  Warnings:

  - A unique constraint covering the columns `[bitPosition]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bitPosition` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Permission` ADD COLUMN `apiPath` VARCHAR(255) NULL,
    ADD COLUMN `bitPosition` INTEGER NOT NULL,
    ADD COLUMN `dataScope` VARCHAR(255) NULL,
    ADD COLUMN `menuPath` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `permissions` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `permissionsString` VARCHAR(1000) NULL;

-- CreateTable
CREATE TABLE `MenuPermissionGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `menuCodes` VARCHAR(1000) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MenuPermissionGroup_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Permission_bitPosition_key` ON `Permission`(`bitPosition`);
