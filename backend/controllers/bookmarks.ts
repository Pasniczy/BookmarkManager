import { Request, Response } from 'express';
import { BookmarkRecord } from '../records/bookmark.record';
import { BookmarkEntity } from '../types';
import { ValidationError } from '../utils/errors';

// @desc Get single bookmark
// @route GET /bookmarks/:id
export const getBookmark = async (req: Request, res: Response) => {
  const bookmark = await BookmarkRecord.getOne(req.params.id);
  res.status(200).json(bookmark);
};

// @desc Get all bookmarks
// @route GET /bookmarks
// @desc Get bookmarks by name
// @route GET /bookmarks?name=...
export const getBookmarks = async (req: Request, res: Response) => {
  const { name } = req.query;
  const bookmarks = await BookmarkRecord.getAll((name && name.toString()) || '');
  res.status(200).json(bookmarks);
};

// @desc Add bookmark
// @route POST /bookmarks/
export const addBookmark = async (req: Request, res: Response) => {
  const bookmark = new BookmarkRecord(req.body as BookmarkEntity);
  await bookmark.add();
  res.status(201).json(bookmark);
};

// @desc Update bookmark
// @route PUT /bookmarks/:id
export const updateBookmark = async (req: Request, res: Response) => {
  const { name, url, favorite } = req.body as BookmarkEntity;

  let bookmark = await BookmarkRecord.getOne(req.params.id);

  if (!bookmark) throw new ValidationError('Bookmark not found');

  if (bookmark.name !== undefined) bookmark.name = name;
  if (bookmark.url !== undefined) bookmark.url = url;
  if (bookmark.favorite !== undefined) bookmark.favorite = favorite;

  bookmark = await bookmark.update();

  res.status(200).json(bookmark);
};

// @desc Delete bookmark
// @route DELETE /bookmarks/:id
export const deleteBookmark = async (req: Request, res: Response) => {
  const bookmark = await BookmarkRecord.getOne(req.params.id);

  if (!bookmark) throw new ValidationError('Bookmark not found');

  await bookmark.delete();

  res.status(200).end();
};
