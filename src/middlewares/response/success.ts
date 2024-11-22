import type { Response } from "express";
import type { ValueOf } from "../../type-utils/typeUtils";
import { StatusCodes } from "http-status-codes";

export type SuccessResponseFunction = (
  data: any,
  statusCode?: number
) => Response;

const successResponseFunction = function (
  data: any,
  statusCode: ValueOf<typeof StatusCodes> = StatusCodes.OK
): SuccessResponseFunction {
  return this.status(statusCode).json({
    status: "success",
    data,
  });
};

export const successResponseMiddleware = (req, res, next) => {
  res.success = successResponseFunction;
  next();
};
