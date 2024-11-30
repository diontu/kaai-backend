import { z } from "zod";
import { primitiveCoercion as pc } from "../../middlewares/request/validation";

// type utils
import type { ConvertToStringValues } from "../../type-utils/typeUtils";

// GET
export const conversationGetIdParamsSchema = z.object({
  id: pc.string(),
});
export type ConversationGetIdParamsSchemaType = ConvertToStringValues<
  z.infer<typeof conversationGetIdParamsSchema>
>;
