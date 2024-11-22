import express, { Response } from "express";
import { recipeGetIdSchema } from "./schema";
import db from "../../db/db";
import { recipesTable } from "../../db/schemas/recipes";
import { eq } from "drizzle-orm";

const router = express.Router();

router.get("/", (req, res) => {
  const decodedSortObject = decodeURIComponent(req.query.sort as string);

  // TODO: get all recipes
  res.send("get hello world!");
});

router.get("/:id", async (req, res: Response) => {
  // TODO: could improve the validation here with a better error message
  const recipeGetIdSchemaObject = {
    id: isNaN(parseInt(req.params.id))
      ? req.params.id
      : parseInt(req.params.id),
  };
  const result = recipeGetIdSchema.safeParse(recipeGetIdSchemaObject);

  if (!result.success) {
    res.error(result.error);
    return;
  }

  const queryResults = await db
    .select()
    .from(recipesTable)
    .where(eq(recipesTable.id, result.data.id));

  res.success(queryResults);
});

router.post("/", (req, res) => {
  // TODO: create a recipe
  const jsonData = req.body;

  res.send(`post hello world! ${JSON.stringify(jsonData)}`);
});

router.put("/:id", (req, res) => {
  // TODO: edit a recipe
  res.send("put hello world!");
});

router.delete("/:id", (req, res) => {
  // TODO: delete a recipe
  res.send("delete hello world!");
});

export default router;
