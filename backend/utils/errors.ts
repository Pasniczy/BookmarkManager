import { NextFunction, Request, Response } from 'express';
import { QueryError } from 'mysql2';

export class ValidationError extends Error {}

export class AuthError extends Error {}

export const handleMySQLError = (err: QueryError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  switch (err.code) {
    case 'ER_DUP_ENTRY':
      return res.status(400).json({
        message: 'User with given email already exists',
      });
    default:
      next(err);
  }
};

export const handleError = (err: Error, req: Request, res: Response) => {
  console.log(err);

  if (err instanceof ValidationError) return res.status(400).json({ message: err.message });

  if (err instanceof AuthError) return res.status(401).json({ message: err.message || 'User unauthorized' });

  res.status(500).json({ message: 'Internal Server Error' });
};
