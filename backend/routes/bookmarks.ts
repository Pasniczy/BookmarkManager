import { Router } from 'express';
import { getBookmark, getBookmarks, addBookmark, updateBookmark, deleteBookmark } from '../controllers/bookmarks';
import { auth } from '../middleware/auth';

export const bookmarksRouter = Router();

bookmarksRouter.use(auth);

bookmarksRouter.route('/:id').get(getBookmark).put(updateBookmark).delete(deleteBookmark);

bookmarksRouter.route('/').get(getBookmarks).post(addBookmark);
