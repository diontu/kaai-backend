import express from "express";

// middlewares
import { Validation } from "../../middlewares/request/validation";

// db and tables
import db from "../../db/db";
import { eq, and } from "drizzle-orm";
import { conversationsTable } from "../../db/schemas/conversations";

// schemas
import {} from "./message-req-schema";

// types
import type { Request, Response } from "express";
import type {} from "./message-req-schema";

// TODO: get all messages for a conversation

// TODO: create a new message given a conversation id
