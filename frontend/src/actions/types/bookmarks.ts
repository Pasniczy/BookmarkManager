import { BookmarkEntity } from 'Models';

export enum BookmarksActionType {
  BOOKMARKS_LOADED = 'BOOKMARKS_LOADED',
  BOOKMARK_LOADED = 'BOOKMARK_LOADED',
  BOOKMARK_ADDED = 'BOOKMARK_ADDED',
  BOOKMARK_EDITED = 'BOOKMARK_EDITED',
  BOOKMARK_DELETED = 'BOOKMARK_DELETED',
  BOOKMARKS_LOADING = 'BOOKMARKS_LOADING',
  BOOKMARKS_ERROR = 'BOOKMARKS_ERROR',
}

export type BookmarksLoaded = {
  type: BookmarksActionType.BOOKMARKS_LOADED;
  payload: {
    bookmarks: BookmarkEntity[];
  };
};

export type BookmarkLoaded = {
  type: BookmarksActionType.BOOKMARK_LOADED;
  payload: {
    bookmark: BookmarkEntity;
  };
};

export type BookmarkAdded = {
  type: BookmarksActionType.BOOKMARK_ADDED;
  payload: {
    bookmark: BookmarkEntity;
  };
};

export type BookmarkEdited = {
  type: BookmarksActionType.BOOKMARK_EDITED;
  payload: {
    id: BookmarkEntity['id'];
    bookmark: BookmarkEntity;
  };
};

export type BookmarkDeleted = {
  type: BookmarksActionType.BOOKMARK_DELETED;
  payload: {
    id: BookmarkEntity['id'];
  };
};

export type BookmarksLoading = {
  type: BookmarksActionType.BOOKMARKS_LOADING;
};

export type BookmarksError = {
  type: BookmarksActionType.BOOKMARKS_ERROR;
  payload: {
    error: string;
  };
};

export type BookmarksAction =
  | BookmarksLoaded
  | BookmarkLoaded
  | BookmarkAdded
  | BookmarkEdited
  | BookmarkDeleted
  | BookmarksLoading
  | BookmarksError;
