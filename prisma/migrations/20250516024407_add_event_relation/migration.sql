/*
  Warnings:

  - Added the required column `event_group_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `event_group_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_event_group_id_fkey` FOREIGN KEY (`event_group_id`) REFERENCES `EventGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
