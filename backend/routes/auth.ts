import { Router } from 'express';
import { register } from '../controllers/auth';

export const authRouter = Router();

authRouter.route('/register').post(register);
