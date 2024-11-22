import { z } from "zod";

export const recipeGetIdSchema = z.object({
  id: z.number(),
});
