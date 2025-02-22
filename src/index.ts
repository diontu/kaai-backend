import "dotenv/config";
import express from "express";
import cors from "cors";

// websocket
import { enableAIChat } from "./websocket/aichat";

// routes
import recipeRouter from "./routers/recipe/recipe";
import conversationRouter from "./routers/conversation/conversation";
import webhookRouter from "./webhook/webhook";

// middlewares
import { successResponseMiddleware } from "./middlewares/response/success";
import { errorResponseMiddleware } from "./middlewares/response/error";

// db
import db from "./db/db";
import { usersTable } from "./db/schemas/users";
import { eq } from "drizzle-orm";

const app = express();
const port = 3000;

// middlewares
app.use(express.json()); // processes json data
app.use(cors());
// response middlewares
app.use(successResponseMiddleware);
app.use(errorResponseMiddleware);

// routes
app.use("/recipe", recipeRouter);
app.use("/conversation", conversationRouter);
app.use("/api/clerk-webhook", webhookRouter);

// TEST
const testFunction = async () => {
  const user1 = {
    name: "John2",
    age: 30,
    email: "john2@example.com",
  };
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user1.email));

  if (result.length !== 0) return;
  await db.insert(usersTable).values(user1);
};
try {
  testFunction();
} catch (error) {
  console.log("dont worry, this is just a test");
}

const server = app.listen(port, () => {
  console.log(`KAAI listening on port ${port}`);
});

enableAIChat(server);
