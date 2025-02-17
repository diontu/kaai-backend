import { z } from "zod";
import { primitiveCoercion as pc } from "../../middlewares/request/validation";

// type utils
import type { ConvertToStringValues } from "../../type-utils/typeUtils";

// GET
export const recipeGetIdParamsSchema = z.object({
  id: pc.number(),
});
export type RecipeGetIdParamsSchemaType = ConvertToStringValues<
  z.infer<typeof recipeGetIdParamsSchema>
>;

// POST
export const recipePostBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  image: z.string().optional(),
  cooking_time_minutes: pc.number(),
  difficulty: z.string(),
});
export type RecipePostBodySchemaType = z.infer<typeof recipePostBodySchema>;

// PUT
export const recipePutParamsSchema = z.object({
  id: pc.number(),
});
export type RecipePutParamsSchemaType = ConvertToStringValues<
  z.infer<typeof recipePutParamsSchema>
>;
export const recipePutBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  image: z.string().optional(),
});
export type RecipePutBodySchemaType = z.infer<typeof recipePutBodySchema>;

// DELETE
export const recipeDeleteParamsSchema = z.object({
  id: pc.number(),
});
export type RecipeDeleteParamsSchemaType = ConvertToStringValues<
  z.infer<typeof recipeDeleteParamsSchema>
>;
