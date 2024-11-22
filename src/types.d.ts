import "express";

// types
import type { Response as ExpressResponse } from "express";
import type { SuccessResponseFunction } from "./middlewares/response/success";
import type { ErrorResponseFunction } from "./middlewares/response/error";

declare module "express" {
  // the Response type should be the same as the below interface
  export interface Response {
    success: SuccessResponseFunction;
    error: ErrorResponseFunction;
  }
}

interface Response extends ExpressResponse {
  success: SuccessResponseFunction;
  error: ErrorResponseFunction;
}
