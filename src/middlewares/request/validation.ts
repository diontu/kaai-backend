import { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

/**
 * Coerces object. Converts primitive types to their specified types.
 */
export const primitiveCoercion = z.coerce;

type RequestTypes = "query" | "body" | "params";

export class Validation {
  /**
   * Returns a middleware that validates the url params
   *
   * @param schema a zod schema object of the url params
   * @returns a middleware that validates the url params
   */
  static check<T extends z.ZodObject<any>>(
    type: RequestTypes,
    schema: T
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const params = req[type];
      const result = schema.safeParse(params);

      if (result.success) {
        next();
        return;
      }

      res.error(result.error);
    };
  }
}
