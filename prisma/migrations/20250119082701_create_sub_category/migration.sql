/*
  Warnings:

  - You are about to drop the column `parentId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_parentId_fkey`;

-- DropIndex
DROP INDEX `Category_parentId_fkey` ON `category`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `parentId`;

-- CreateTable
CREATE TABLE `SubCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
