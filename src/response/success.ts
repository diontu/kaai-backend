import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

type SuccessResponseFunction = (data: any, statusCode?: number) => Response;

const successResponseFunction = function (
  data: any,
  statusCode: ValueOf<typeof StatusCodes> = StatusCodes.OK
): SuccessResponseFunction {
  return this.status(statusCode).json({
    status: "success",
    data,
  });
};

const successResponseMiddleware = (req, res, next) => {
  res.success = successResponseFunction;
  next();
};

export { successResponseMiddleware, SuccessResponseFunction };
