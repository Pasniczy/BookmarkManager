import { Router } from 'express';
import { register, login } from '../controllers/auth';

export const authRouter = Router();

authRouter.route('/register').post(register);

authRouter.route('/login').post(login);
