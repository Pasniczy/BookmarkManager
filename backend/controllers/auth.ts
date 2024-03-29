import { Request, Response } from 'express';
import { NewUserEntity, LoginUserRequestData, LoadUserResponseData } from '../types';
import { AuthError, ValidationError } from '../utils/errors';
import { UserRecord } from '../records/user.record';

// @desc Load user
// @route GET /auth
// @access Private
export const loadUser = async (req: Request, res: Response) => {
  if (!req.session.user) {
    throw new AuthError();
  }
  const { username, email, createdAt } = req.session.user;
  const loadUserResponseData: LoadUserResponseData = { username, email, createdAt };
  res.status(200).json({ user: loadUserResponseData });
};

// @desc Register user
// @route POST /auth/register
// @access Public
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
// @access Public
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginUserRequestData;

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
// @route GET /auth/logout
// @access Public
export const logout = async (req: Request, res: Response) => {
  req.session.token = null;
  req.session.user = null;
  res.status(200).json({ message: 'User logged out' });
};
