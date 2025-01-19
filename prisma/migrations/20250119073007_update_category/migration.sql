-- AlterTable
ALTER TABLE `category` ADD COLUMN `parentId` INTEGER NULL,
    ADD COLUMN `title` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
