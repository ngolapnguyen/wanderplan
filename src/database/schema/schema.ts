import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const planContent = pgTable('plan_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  lastModified: timestamp('last_modified').notNull().defaultNow(),
  vectorClock: jsonb('vector_clock').notNull(),
});
