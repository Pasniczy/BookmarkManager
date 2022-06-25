import express from 'express';
import * as dotenv from 'dotenv';
import { bookmarksRouter } from './routes/bookmarks';
import { handleError } from './utils/errors';

dotenv.config({ path: './config/config.env' });
const APP_PORT = parseInt(process.env.APP_PORT, 10) || 5000;

const app = express();

app.use(express.json());

app.use('/bookmarks', bookmarksRouter);

app.use(handleError);

app.listen(APP_PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://localhost:${APP_PORT}`);
});
