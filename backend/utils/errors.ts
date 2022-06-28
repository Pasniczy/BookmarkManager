import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  const isValidationError = err instanceof ValidationError;

  if (isValidationError) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};
