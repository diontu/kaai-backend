import type { RequestHandler, Request, Response, NextFunction } from "express";
import type { ValueOf } from "../../type-utils/typeUtils";
import { StatusCodes } from "http-status-codes";

export type SuccessResponseFunction = (
  data: any,
  statusCode?: number
) => Response;

const successResponseFunctionGenerator = function (res: Response) {
  const successResponseFunction: SuccessResponseFunction = function (
    data: any,
    statusCode: ValueOf<typeof StatusCodes> = StatusCodes.OK
  ) {
    return res.status(statusCode).json({
      status: "success",
      data,
    });
  };

  return successResponseFunction;
};

export const successResponseMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = successResponseFunctionGenerator(res);
  next();
};
