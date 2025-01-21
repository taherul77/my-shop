/*
  Warnings:

  - You are about to alter the column `image` on the `brand` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `brand` MODIFY `image` VARCHAR(191) NULL DEFAULT 'https://res.cloudinary.com/dkvqtc5pb/image/upload/v1737433308/products/1737433306032-taherul.PNG.png';
