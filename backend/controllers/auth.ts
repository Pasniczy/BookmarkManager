import { Request, Response } from 'express';
import { NewUserEntity } from 'types';
import { UserRecord } from '../records/user.record';

// @desc Register user
// @route POST /register
export const register = async (req: Request, res: Response) => {
  let user = new UserRecord(req.body as NewUserEntity);
  user = await user.create();
  res.status(201).json(user);
};
