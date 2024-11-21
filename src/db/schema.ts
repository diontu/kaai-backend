import {
  int,
  mysqlTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

// export const usersTable = mysqlTable("users", {
//   id: int().autoincrement().primaryKey(),
//   name: varchar({ length: 255 }).notNull(),
//   age: int().notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
//   created_at: timestamp().defaultNow(),
// });

// export const recipesTable = mysqlTable("recipes", {
//   id: int().autoincrement().primaryKey(),
//   name: varchar({ length: 255 }).notNull(),
//   description: varchar({ length: 1000 }),
//   ingredients: varchar({ length: 255 }).notNull(),
//   instructions: varchar({ length: 255 }).notNull(),
//   image: varchar({ length: 255 }),
//   user_id: int()
//     .notNull()
//     .references(() => usersTable.id),
// })

// export const booksTable = mysqlTable("books_table", {
//   id: int().autoincrement().primaryKey(),
//   title: varchar({ length: 255 }).notNull(),
//   author: varchar({ length: 255 }).notNull(),
//   copy_count: int().notNull(),
//   available_copies: int().notNull(),
// });

// export const borrowingTable = mysqlTable("borrowing_table", {
//   id: serial().primaryKey(),
//   user_id: int()
//     .notNull()
//     .references(() => usersTable.id),
//   book_id: int()
//     .notNull()
//     .references(() => booksTable.id),
//   date_borrowed: timestamp().defaultNow(),
//   date_returned: timestamp(),
// });
