import { z } from "zod";
import { primitiveCoercion as pc } from "../../middlewares/request/validation";

// type utils
import type { ConvertToStringValues } from "../../type-utils/typeUtils";

export const recipeGetIdSchema = z.object({
  id: pc.number(),
});
export type RecipeGetIdSchemaType = ConvertToStringValues<
  z.infer<typeof recipeGetIdSchema>
>;

export const recipePostSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  image: z.string().optional(),
});
export type RecipePostSchemaType = z.infer<typeof recipePostSchema>;
