import { decimal, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const nutrientsTable = mysqlTable("nutrients", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  unit: varchar({ length: 50 }), // e.g. grams, mg
  dailyValuePercentage: decimal("daily_value_percentage", {
    precision: 5,
    scale: 2,
  }),
});
