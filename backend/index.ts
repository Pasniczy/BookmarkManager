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

const APP_PORT = (process.env.APP_PORT && parseInt(process.env.APP_PORT, 10)) || 5000;

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
    origin: `http://localhost:${process.env.FRONTEND_APP_PORT || 3000}`,
  })
);

app.use('/bookmarks', bookmarksRouter);
app.use('/auth', authRouter);

app.use(handleError);

app.listen(APP_PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://localhost:${APP_PORT}`);
});
