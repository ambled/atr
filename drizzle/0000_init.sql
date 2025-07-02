CREATE TABLE `price` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chainId` text NOT NULL,
	`symbol` text NOT NULL,
	`price` blob NOT NULL,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chainId` text NOT NULL,
	`blockNum` text NOT NULL,
	`uniqueId` text NOT NULL,
	`hashNum` text NOT NULL,
	`fromWallet` text NOT NULL,
	`toWallet` text NOT NULL,
	`symbol` text NOT NULL,
	`value` text NOT NULL,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wallet` (
	`address` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`updatedAt` integer NOT NULL,
	`name` text NOT NULL,
	`ant` text DEFAULT '0' NOT NULL,
	`arbeth` text DEFAULT '0' NOT NULL,
	`arbusdc` text DEFAULT '0' NOT NULL,
	`maineth` text DEFAULT '0' NOT NULL
);
