import { Router } from 'express';
import { register, login, logout, testAuth } from '../controllers/auth';
import { auth } from '../middleware/auth';

export const authRouter = Router();

authRouter.route('/register').post(register);

authRouter.route('/login').post(login);

authRouter.route('/logout').get(logout);

authRouter.route('/test').get(auth, testAuth);
