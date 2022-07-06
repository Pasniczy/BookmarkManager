import { Request, Response } from 'express';
import { BookmarkRecord } from '../records/bookmark.record';
import { BookmarkEntity, NewBookmarkData } from '../types';
import { AuthError, ValidationError } from '../utils/errors';

// @desc Get single bookmark
// @route GET /bookmarks/:id
// @access Private
export const getBookmark = async (req: Request, res: Response) => {
  const { user } = req.session;
  if (!user) throw new AuthError();

  const bookmark = await BookmarkRecord.getOne(req.params.id);
  if (!bookmark) throw new ValidationError('Bookmark not found');

  if (user.id !== bookmark.user) throw new AuthError('User unauthorized to access requested bookmark');

  res.status(200).json(bookmark);
};

// @desc Get all bookmarks
// @route GET /bookmarks
// @desc Get bookmarks by name
// @route GET /bookmarks?name=...
// @access Private
export const getBookmarks = async (req: Request, res: Response) => {
  const { name } = req.query;
  const { user } = req.session;

  if (!user) throw new AuthError();

  const bookmarks = await BookmarkRecord.getAllByUser(user.id, (name && name.toString()) || '');
  res.status(200).json(bookmarks);
};

// @desc Add bookmark
// @route POST /bookmarks
// @access Private
export const addBookmark = async (req: Request, res: Response) => {
  const { user } = req.session;

  if (!user) throw new AuthError();

  const bookmark = new BookmarkRecord({ ...(req.body as NewBookmarkData), user: user.id });
  await bookmark.add();
  res.status(201).json(bookmark);
};

// @desc Update bookmark
// @route PUT /bookmarks/:id
// @access Private
export const updateBookmark = async (req: Request, res: Response) => {
  const { name, url, favorite } = req.body as BookmarkEntity;
  const { user } = req.session;

  if (!user) throw new AuthError();

  let bookmark = await BookmarkRecord.getOne(req.params.id);
  if (!bookmark) throw new ValidationError('Bookmark not found');

  if (user.id !== bookmark.user) throw new AuthError('User unauthorized to access requested bookmark');

  if (bookmark.name !== undefined) bookmark.name = name;
  if (bookmark.url !== undefined) bookmark.url = url;
  if (bookmark.favorite !== undefined) bookmark.favorite = favorite;

  bookmark = await bookmark.update();

  res.status(200).json(bookmark);
};

// @desc Delete bookmark
// @route DELETE /bookmarks/:id
// @access Private
export const deleteBookmark = async (req: Request, res: Response) => {
  const { user } = req.session;
  if (!user) throw new AuthError();

  const bookmark = await BookmarkRecord.getOne(req.params.id);
  if (!bookmark) throw new ValidationError('Bookmark not found');

  if (user.id !== bookmark.user) throw new AuthError('User unauthorized to access requested bookmark');

  await bookmark.delete();

  res.status(200).end();
};
