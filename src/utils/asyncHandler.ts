import { NextFunction, RequestHandler, Request, Response } from "express";

const asyncHandler = (handler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch((error: any) => next(error));
  };
};

export default asyncHandler;
