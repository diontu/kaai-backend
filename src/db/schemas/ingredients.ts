import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const ingredientsTable = mysqlTable("ingredients", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});
