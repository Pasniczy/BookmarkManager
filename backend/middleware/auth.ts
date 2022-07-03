import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthError } from '../utils/errors';
import { UserRecord } from '../records/user.record';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.session;

  if (!token) {
    throw new AuthError('Not authorized to access this route');
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.session.user = await UserRecord.findOneById(decoded.id);
    next();
  } catch (err) {
    console.error(err);
    throw new AuthError('Not authorized to access this route');
  }
};
