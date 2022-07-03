import { Request, Response } from 'express';
import { NewUserEntity } from 'types';
import { ValidationError } from '../utils/errors';
import { UserRecord } from '../records/user.record';

// @desc Register user
// @route POST /auth/register
export const register = async (req: Request, res: Response) => {
  let user = new UserRecord(req.body as NewUserEntity);
  user = await user.create();
  res.status(201).json(user);
};

// @desc Login user
// @route POST /auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    throw new ValidationError('Email and password must be provided');
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new ValidationError('Email and password must be of type string');
  }

  const user = await UserRecord.findOneByEmail(email);

  if (!user) {
    throw new ValidationError('User not found');
  }

  const isPasswordCorrect = await user.matchPassword(password);

  if (!isPasswordCorrect) {
    throw new ValidationError('Incorrect password');
  }

  res.status(200).json(user);
};
