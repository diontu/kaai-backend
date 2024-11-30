import express from "express";

// middlewares
import { Validation } from "../../middlewares/request/validation";

// db and tables
import db from "../../db/db";
import { eq, desc, asc } from "drizzle-orm";
import {
  conversationsTable,
  messagesTable,
} from "../../db/schemas/conversations";

// schemas
import { conversationGetIdParamsSchema } from "./conversation-req-schema";

// types
import type { Request, Response } from "express";
import type { ConversationGetIdParamsSchemaType } from "./conversation-req-schema";

const router = express.Router();

// gets all conversations
router.get("/", async (req: Request, res: Response) => {
  const queryResults = await db
    .select()
    .from(conversationsTable)
    .where(eq(conversationsTable.created_by, 1)); // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)

  res.success(queryResults);
});

router.get(
  "/:id",
  Validation.check("params", conversationGetIdParamsSchema),
  async (req: Request<ConversationGetIdParamsSchemaType>, res: Response) => {
    const conversationIdEncoded = req.params.id;
    const conversationId = atob(conversationIdEncoded);

    // get all messages for the specified conversation
    const results = await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.conversation_id, conversationId))
      .orderBy(asc(messagesTable.created_at));

    res.success(results);
  }
);

// create a conversation id
router.post("/", async (_req: Request, res: Response) => {
  await db.insert(conversationsTable).values({
    created_by: 1, // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)
  });
  const selectResults = await db
    .select()
    .from(conversationsTable)
    .orderBy(desc(conversationsTable.created_at))
    .limit(1);

  res.success(selectResults[0]);
});

export default router;
