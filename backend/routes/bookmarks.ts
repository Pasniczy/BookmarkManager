import { Router } from 'express';
import { getBookmark, getBookmarks, addBookmark, updateBookmark } from '../controllers/bookmarks';

export const bookmarksRouter = Router();

bookmarksRouter.route('/:id').get(getBookmark).put(updateBookmark);

bookmarksRouter.route('/').get(getBookmarks).post(addBookmark);
