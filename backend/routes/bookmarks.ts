import { Router } from 'express';
import { getBookmark, getBookmarks } from '../controllers/bookmarks';

export const bookmarksRouter = Router();

bookmarksRouter.route('/:id').get(getBookmark);

bookmarksRouter.route('/').get(getBookmarks);
