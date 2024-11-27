import express from "express";

// middlewares
import { Validation } from "../../middlewares/request/validation";

// db and tables
import db from "../../db/db";
import { eq, and } from "drizzle-orm";
import { conversationsTable } from "../../db/schemas/conversations";

// schemas
import {} from "./conversation-req-schema";

// types
import type { Request, Response } from "express";
import type {} from "./conversation-req-schema";

const router = express.Router();

// gets all conversations
router.get("/", async (req: Request, res: Response) => {
  const queryResults = await db
    .select()
    .from(conversationsTable)
    .where(eq(conversationsTable.created_by, 1)); // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)

  res.success(queryResults);
});

// TODO: creates a new conversation id

export default router;
