import { unique } from 'drizzle-orm/gel-core';
import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';
import { uniqueId, update } from 'lodash';

export const wallet = sqliteTable('wallet', {
	address: text().primaryKey(),
	status: text().notNull().default('active'),
	updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull().default(new Date()),
	name: text().notNull(),
	ant: text().notNull().default('0'),
	arbeth: text().notNull().default('0'),
	arbusdc: text().notNull().default('0'),
	maineth: text().notNull().default('0'),
});
export const transaction = sqliteTable('transaction', {
	id: integer().primaryKey({ autoIncrement: true }),
	chainId: text().notNull(),
	blockNum: text().notNull(),
	uniqueId: text().notNull(),
	hashNum: text().notNull(),
	fromWallet: text().notNull(),
	toWallet: text().notNull(),
	symbol: text().notNull(),
	value: text().notNull(),
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(new Date()),
}, (table) => [
  index('txId').on(table.chainId, table.blockNum, table.uniqueId),
  index('idx_from').on(table.fromWallet),
  index('idx_to').on(table.toWallet),
]);
export const price = sqliteTable('price', {
	id: integer().primaryKey({ autoIncrement: true }),
	chainId: text().notNull(),
	symbol: text().notNull(),
	price: text().notNull(),
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(new Date()),
}, (table) => [
  index('priceId').on(table.chainId, table.symbol, table.timestamp),
]);
	
export type Wallet = typeof wallet.$inferSelect;
export type NewWallet = typeof wallet.$inferInsert;
export type Transaction = typeof transaction.$inferSelect;
export type NewTransaction = typeof transaction.$inferInsert;
export type Price = typeof price.$inferSelect;
export type NewPrice = typeof price.$inferInsert;