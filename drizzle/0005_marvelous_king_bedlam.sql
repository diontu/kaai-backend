ALTER TABLE `conversations` DROP FOREIGN KEY `conversations_created_by_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `messages` DROP FOREIGN KEY `messages_conversation_id_conversations_id_fk`;
--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_conversation_id_conversations_id_fk` FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE cascade ON UPDATE no action;