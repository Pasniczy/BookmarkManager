import path from 'path';
import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import 'express-async-errors';
import { handleError, handleMySQLError } from './utils/errors';
import { bookmarksRouter } from './routes/bookmarks';
import { authRouter } from './routes/auth';
import { UserRecord } from './records/user.record';

declare module 'express-session' {
  export interface SessionData {
    token: string | null | undefined;
    user: UserRecord | null | undefined;
  }
}

dotenv.config({ path: './config/config.env' });

const APP_PORT = (process.env.APP_PORT && parseInt(process.env.APP_PORT, 10)) || 3001;
const APP_URL = (process.env.APP_URL && parseInt(process.env.APP_URL, 10)) || 'http://localhost:3001';
const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL || 'http://localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET || 'random-string';
const SESSION_EXPIRE = process.env.SESSION_EXPIRE || 2592000000;

const app = express();
const appRouter = Router();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(
  session({
    name: 'session',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + Number(SESSION_EXPIRE)),
    },
  })
);
app.use(
  cors({
    origin: FRONTEND_APP_URL,
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 200,
  })
);

appRouter.use('/bookmarks', bookmarksRouter);
appRouter.use('/auth', authRouter);
app.use('/api', appRouter);

app.use(handleMySQLError);
app.use(handleError);

app.listen(APP_PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${APP_URL}`);
});
