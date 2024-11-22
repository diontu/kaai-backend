import { z } from "zod";

export const recipeGetIdSchema = z.object({
  id: z.number(),
});

export const recipePostSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  instructions: z.string().optional(),
  image: z.string().optional(),
  created_by: z.number(),
});
