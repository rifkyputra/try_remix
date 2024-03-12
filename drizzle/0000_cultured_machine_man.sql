CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`message` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todos_id_unique` ON `todos` (`id`);