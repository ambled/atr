import { unique } from 'drizzle-orm/gel-core';
import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';
import { uniqueId, update } from 'lodash';

export const wallet = sqliteTable('wallet', {
	address: text().primaryKey(),
	status: text().notNull().default('active'),
	updatedAt: integer().notNull(),
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
	timestamp: integer().notNull(),
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
	timestamp: integer().notNull(),
}, (table) => [
  index('priceId').on(table.chainId, table.symbol, table.timestamp),
]);
	