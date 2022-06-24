import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValidationError = err instanceof ValidationError;

  if (isValidationError) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal Server Error" });
};
