import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import express from "express";
import recipeRouter from "./routers/recipe";
import db from "./db/db";

const db = drizzle(process.env.DATABASE_URL!);
const app = express();
const port = 3000;

// middlewares
app.use(express.json()); // processes json data

app.use("/recipe", recipeRouter);

app.listen(port, () => {
  console.log(`KAAI listening on port ${port}`);
});

// async function main() {
//   const user: typeof usersTable.$inferInsert = {
//     name: "John",
//     age: 30,
//     email: "john@example.com",
//   };
//   await db.insert(usersTable).values(user);
//   console.log("New user created!");
//   const users = await db.select().from(usersTable);
//   console.log("Getting all users from the database: ", users);
//   await db
//     .update(usersTable)
//     .set({
//       age: 31,
//     })
//     .where(eq(usersTable.email, user.email));
//   console.log("User info updated!");
//   await db.delete(usersTable).where(eq(usersTable.email, user.email));
//   console.log("User deleted!");
// }
// main();
