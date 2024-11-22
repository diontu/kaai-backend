import type { Response } from "express";
import type { ValueOf } from "./../type-utils/typeUtils";
import { StatusCodes } from "http-status-codes";

export type ErrorResponseFunction = (
  error: any,
  statusCode?: number
) => Response;

const errorResponseFunction = function (
  error: any,
  statusCode: ValueOf<typeof StatusCodes> = StatusCodes.BAD_REQUEST
): ErrorResponseFunction {
  return this.status(statusCode).json({
    status: "error",
    error,
  });
};

export const errorResponseMiddleware = (req, res, next) => {
  res.error = errorResponseFunction;
  next();
};
