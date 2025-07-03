CREATE TABLE `price` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chainId` text NOT NULL,
	`symbol` text NOT NULL,
	`price` text NOT NULL,
	`timestamp` integer DEFAULT '"2025-07-02T21:22:10.044Z"' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `priceId` ON `price` (`chainId`,`symbol`,`timestamp`);--> statement-breakpoint
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
	`timestamp` integer DEFAULT '"2025-07-02T21:22:10.043Z"' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `txId` ON `transaction` (`chainId`,`blockNum`,`uniqueId`);--> statement-breakpoint
CREATE INDEX `idx_from` ON `transaction` (`fromWallet`);--> statement-breakpoint
CREATE INDEX `idx_to` ON `transaction` (`toWallet`);--> statement-breakpoint
CREATE TABLE `wallet` (
	`address` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-07-02T21:22:10.043Z"' NOT NULL,
	`name` text NOT NULL,
	`ant` text DEFAULT '0' NOT NULL,
	`arbeth` text DEFAULT '0' NOT NULL,
	`arbusdc` text DEFAULT '0' NOT NULL,
	`maineth` text DEFAULT '0' NOT NULL
);
