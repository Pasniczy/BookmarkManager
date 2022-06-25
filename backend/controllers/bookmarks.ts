import { Request, Response, NextFunction } from "express";
import { BookmarkRecord } from "../records/bookmark.record";

// @desc Get all bookmarks
// @route GET /bookmarks
export const getBookmarks = async (req: Request, res: Response, next: NextFunction) => {
  const bookmarks = await BookmarkRecord.getAll(req.params.name ?? "");
  res.status(200).json(bookmarks);
};
