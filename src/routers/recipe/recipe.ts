import express from "express";

// middlewares
import { Validation } from "../../middlewares/request/validation";

// db
import db from "../../db/db";
import { recipesTable } from "../../db/schemas/recipes";
import { eq, and } from "drizzle-orm";

// schemas
import {
  recipeGetIdParamsSchema,
  recipePostBodySchema,
  recipePutParamsSchema,
  recipePutBodySchema,
  recipeDeleteParamsSchema,
} from "./schema";

// types
import type { Request, Response } from "express";
import type {
  RecipeGetIdParamsSchemaType,
  RecipePostBodySchemaType,
  RecipePutParamsSchemaType,
  RecipePutBodySchemaType,
  RecipeDeleteParamsSchemaType,
} from "./schema";

const router = express.Router();

router.get("/", async (_req, res) => {
  const queryResults = await db.select().from(recipesTable);

  res.success(queryResults);
});

router.get(
  "/:id",
  Validation.check("params", recipeGetIdParamsSchema),
  async (req: Request<RecipeGetIdParamsSchemaType>, res: Response) => {
    const recipeId = Number(req.params.id);
    const queryResults = await db
      .select()
      .from(recipesTable)
      .where(
        and(
          eq(recipesTable.id, recipeId),
          eq(recipesTable.created_by, 1) // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)
        )
      );

    res.success(queryResults);
  }
);

router.post(
  "/",
  Validation.check("body", recipePostBodySchema),
  async (req: Request<{}, {}, RecipePostBodySchemaType>, res: Response) => {
    const jsonData = req.body;
    await db.insert(recipesTable).values({
      ...jsonData,
      created_by: 1, // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)
    });

    res.success(jsonData);
  }
);

router.put(
  "/:id",
  Validation.check("params", recipePutParamsSchema),
  Validation.check("body", recipePutBodySchema),
  async (
    req: Request<RecipePutParamsSchemaType, {}, RecipePutBodySchemaType>,
    res: Response
  ) => {
    const recipeId = Number(req.params.id);
    const jsonData = req.body;
    // make sure the recipe is created by the current user
    const checkRecipeQuery = await db
      .select()
      .from(recipesTable)
      .where(eq(recipesTable.id, recipeId));

    if (checkRecipeQuery.length === 0) {
      res.error("Recipe not found", 404);
      return;
    }

    if (checkRecipeQuery[0].created_by !== 1) {
      // TODO: SET THIS TO THE CURRENT USER (ID OBTAINED THRU AUTH)
      res.error("You are not authorized to update this recipe", 403);
      return;
    }

    await db
      .update(recipesTable)
      .set({
        ...jsonData,
      })
      .where(eq(recipesTable.id, recipeId));

    res.success(jsonData);
  }
);

router.delete(
  "/:id",
  Validation.check("params", recipeDeleteParamsSchema),
  async (req: Request<RecipeDeleteParamsSchemaType>, res: Response) => {
    await db
      .delete(recipesTable)
      .where(eq(recipesTable.id, Number(req.params.id)));

    res.success({
      id: req.params.id,
    });
  }
);

export default router;
