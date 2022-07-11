import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { handleError } from './utils/errors';
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

const app = express();

app.use(
  session({
    name: 'session',
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: process.env.NODE_ENV === 'development',
      expires: new Date(Date.now() + Number(process.env.SESSION_EXPIRE)),
    },
  })
);

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_APP_URL,
    credentials: true,
  })
);

app.use('/bookmarks', bookmarksRouter);
app.use('/auth', authRouter);

app.use(handleError);

app.listen(APP_PORT, 'localhost', () => {
  console.log(`Server listening on ${APP_URL}`);
});
