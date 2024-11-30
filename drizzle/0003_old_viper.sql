ALTER TABLE `conversations` MODIFY COLUMN `id` char(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `conversations` MODIFY COLUMN `title` varchar(255);--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `id` char(36) NOT NULL DEFAULT 'd0328d11-84cd-4189-93e5-b3dd60feab70';--> statement-breakpoint
ALTER TABLE `conversations` ADD `created_by` int NOT NULL;--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;