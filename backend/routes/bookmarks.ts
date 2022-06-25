import { Router } from 'express';
import { getBookmark, getBookmarks, addBookmark, updateBookmark, deleteBookmark } from '../controllers/bookmarks';

export const bookmarksRouter = Router();

bookmarksRouter.route('/:id').get(getBookmark).put(updateBookmark).delete(deleteBookmark);

bookmarksRouter.route('/').get(getBookmarks).post(addBookmark);
