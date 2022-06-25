import { Router } from "express";
import { getBookmark, getBookmarks } from "../controllers/bookmarks";

export const bookmarksRouter = Router();

bookmarksRouter.get("/:id", getBookmark);
bookmarksRouter.get("/", getBookmarks);
