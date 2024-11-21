import { decimal, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

// tables
import { nutrientsTable } from "./nutrients";

export const ingredientsTable = mysqlTable("ingredients", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export const ingredientNutrientsTable = mysqlTable("ingredient_nutrients", {
  id: int().autoincrement().primaryKey(),
  ingredient_id: int()
    .notNull()
    .references(() => ingredientsTable.id),
  nutrient_id: int()
    .notNull()
    .references(() => nutrientsTable.id),
  standard_ingredient_unit: varchar({ length: 50 }).notNull(),
  standard_ingredient_amount: varchar({ length: 50 }).notNull(),
  quantity: decimal({
    precision: 10,
    scale: 2,
  }).notNull(), // Amount of the nutrient per standard unit of ingredient (e.g. 100g, 100ml, 1 piece, 1 tbsp, 1 cup ~ 250ml)
});
