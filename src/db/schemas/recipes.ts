import {
  int,
  mysqlTable,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";

// tables
import { usersTable } from "./users";
import { ingredientsTable } from "./ingredients";

export const recipesTable = mysqlTable("recipes", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }),
  instructions: text(),
  image: varchar({ length: 255 }),
  created_by: int()
    .notNull()
    .references(() => usersTable.id),
  created_at: timestamp().defaultNow(),
});

export const recipeIngredientsTable = mysqlTable("recipe_ingredients", {
  id: int().autoincrement().primaryKey(),
  recipe_id: int()
    .notNull()
    .references(() => recipesTable.id),
  ingredient_id: int()
    .notNull()
    .references(() => ingredientsTable.id),
  quantity: varchar({ length: 50 }).notNull(),
  unit: varchar({ length: 50 }).notNull(),
});
