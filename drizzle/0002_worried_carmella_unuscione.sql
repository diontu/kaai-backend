CREATE TABLE `conversations` (
	`id` char(36) NOT NULL DEFAULT 'd835a1b4-c19d-4caf-a48d-ac5da2124d3d',
	`title` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` char(36) NOT NULL DEFAULT 'be3e9c00-b012-4df9-b231-139ab940b2fe',
	`content` text NOT NULL,
	`user_id` int,
	`conversation_id` char(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_conversation_id_conversations_id_fk` FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE no action ON UPDATE no action;