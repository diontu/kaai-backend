import type { RequestHandler, Request, Response, NextFunction } from "express";
import type { ValueOf } from "../../type-utils/typeUtils";
import { StatusCodes } from "http-status-codes";

export type ErrorResponseFunction = (
  data: any,
  statusCode?: number
) => Response;

const errorResponseFunctionGenerator = function (res: Response) {
  const errorResponseFunction: ErrorResponseFunction = function (
    data: any,
    statusCode: ValueOf<typeof StatusCodes> = StatusCodes.OK
  ) {
    return res.status(statusCode).json({
      status: "error",
      data,
    });
  };

  return errorResponseFunction;
};

export const errorResponseMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.error = errorResponseFunctionGenerator(res);
  next();
};
