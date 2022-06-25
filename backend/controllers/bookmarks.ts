import { Request, Response, NextFunction } from "express";
import { BookmarkRecord } from "../records/bookmark.record";

// @desc Get all bookmarks
// @route GET /bookmarks
// @desc Get bookmarks by name
// @route GET /bookmarks?name=...
export const getBookmarks = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;

  const bookmarks = await BookmarkRecord.getAll((name && name.toString()) || "");
  res.status(200).json(bookmarks);
};
