import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

/**
 * Resources table - stores source content from Alpha Funding website
 * Each resource represents a crawled page or document
 */
export const resources = pgTable('resources', {
    id: varchar('id', { length: 191 })
        .primaryKey()
        .$defaultFn(() => nanoid()),

    // The full text content of the page
    content: text('content').notNull(),

    // Source URL
    url: varchar('url', { length: 512 }),

    // Page title
    title: varchar('title', { length: 256 }),

    // Type of content (homepage, service, about, faq, policy, etc.)
    contentType: varchar('content_type', { length: 64 }),

    // Timestamps
    lastIndexed: timestamp('last_indexed').defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
