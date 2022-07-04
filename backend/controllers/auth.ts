import { Request, Response } from 'express';
import { NewUserEntity, UserLoginRequestData } from '../types';
import { ValidationError } from '../utils/errors';
import { UserRecord } from '../records/user.record';

// @desc Register user
// @route POST /auth/register
export const register = async (req: Request, res: Response) => {
  let user = new UserRecord(req.body as NewUserEntity);
  user = await user.create();

  const token = user.getSignedJWTToken();
  req.session.token = token;
  req.session.user = user;
  res.status(200).json({ message: 'User logged in', token });
};

// @desc Login user
// @route POST /auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserLoginRequestData;

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

  const token = user.getSignedJWTToken();
  req.session.token = token;
  req.session.user = user;
  res.status(200).json({ message: 'User logged in', token });
};

// @desc Logout user
// @route POST /auth/logout
export const logout = async (req: Request, res: Response) => {
  req.session.token = null;
  req.session.user = null;
  res.status(200).json({ message: 'User logged out' });
};

export const testAuth = async (req: Request, res: Response) => {
  const { token } = req.session;
  res.status(201).json({ token });
};
