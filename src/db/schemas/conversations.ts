import {
  int,
  mysqlTable,
  varchar,
  timestamp,
  text,
  char,
} from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";

// tables
import { usersTable } from "./users";

export const conversationsTable = mysqlTable("conversations", {
  id: char({ length: 36 }).default(uuidv4()).primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow(),
});

export const messagesTable = mysqlTable("messages", {
  id: char({ length: 36 }).default(uuidv4()).primaryKey(),
  content: text().notNull(),
  user_id: int().references(() => usersTable.id),
  conversation_id: char({ length: 36 })
    .notNull()
    .references(() => conversationsTable.id),
  created_at: timestamp().defaultNow(),
});
