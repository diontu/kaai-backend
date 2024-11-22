import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

type ErrorResponseFunction = (error: any, statusCode?: number) => Response;

const errorResponseFunction = function (
  error: any,
  statusCode: ValueOf<typeof StatusCodes> = StatusCodes.BAD_REQUEST
): ErrorResponseFunction {
  return this.status(statusCode).json({
    status: "error",
    error,
  });
};

const errorResponseMiddleware = (req, res, next) => {
  res.error = errorResponseFunction;
  next();
};

export { errorResponseMiddleware, ErrorResponseFunction };
