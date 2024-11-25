import "dotenv/config";
import express from "express";
import recipeRouter from "./routers/recipe/recipe";
import db from "./db/db";
import { successResponseMiddleware } from "./middlewares/response/success";
import { errorResponseMiddleware } from "./middlewares/response/error";
import { usersTable } from "./db/schemas/users";

import { eq } from "drizzle-orm";

const app = express();
const port = 3000;

// middlewares
app.use(express.json()); // processes json data
// response middleware
app.use(successResponseMiddleware);
app.use(errorResponseMiddleware);

// routes
app.use("/recipe", recipeRouter);

// TEST
const testFunction = async () => {
  const user = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };
  if (
    await db.select().from(usersTable).where(eq(usersTable.email, user.email))
  )
    return;
  await db.insert(usersTable).values(user);
};
try {
  testFunction();
} catch (error) {
  console.log("dont worry, this is just a test");
}

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
