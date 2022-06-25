import { Router } from "express";
import { getBookmarks } from "../controllers/bookmarks";

export const bookmarksRouter = Router();

bookmarksRouter.get("/", getBookmarks);
