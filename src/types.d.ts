import "express";

// types
import type { SuccessResponseFunction } from "./middlewares/response/success";
import type { ErrorResponseFunction } from "./middlewares/response/error";

declare global {
  namespace Express {
    interface Response {
      success: SuccessResponseFunction;
      error: ErrorResponseFunction;
    }
  }
}
