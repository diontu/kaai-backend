import express from "express";
import { recipeGetIdSchema, recipePostSchema } from "./schema";
import db from "../../db/db";
import { recipesTable } from "../../db/schemas/recipes";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { Validation } from "../../middlewares/request/validation";

// types
import type { Request, Response } from "express";
import type { RecipeGetIdSchemaType, RecipePostSchemaType } from "./schema";

const router = express.Router();

router.get("/", async (_req, res) => {
  const queryResults = await db.select().from(recipesTable);

  res.success(queryResults);
});

router.get(
  "/:id",
  Validation.check("params", recipeGetIdSchema),
  async (req: Request<RecipeGetIdSchemaType>, res: Response) => {
    const queryResults = await db
      .select()
      .from(recipesTable)
      .where(eq(recipesTable.id, Number(req.params.id)));

    res.success(queryResults);
  }
);

router.post(
  "/",
  Validation.check("body", recipePostSchema),
  async (req: Request<{}, {}, RecipePostSchemaType>, res: Response) => {
    const jsonData = req.body;
    await db.insert(recipesTable).values({
      ...jsonData,
      created_by: 1, // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)
    });

    res.success(jsonData);
  }
);

router.put("/:id", (req, res) => {
  // TODO: edit a recipe
  res.send("put hello world!");
});

router.delete("/:id", (req, res) => {
  // TODO: delete a recipe
  res.send("delete hello world!");
});

export default router;
