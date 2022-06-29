import { BookmarkEntity } from 'Models';

export enum BookmarksActionType {
  GET_BOOKMARKS = 'GET_BOOKMARKS',
  GET_BOOKMARK = 'GET_BOOKMARK',
  BOOKMARK_ADDED = 'BOOKMARK_ADDED',
  BOOKMARK_EDITED = 'BOOKMARK_EDITED',
  BOOKMARKS_LOADING = 'BOOKMARKS_LOADING',
  BOOKMARKS_ERROR = 'BOOKMARKS_ERROR',
}

export type GetAllBookmarks = {
  type: BookmarksActionType.GET_BOOKMARKS;
  payload: {
    bookmarks: BookmarkEntity[];
  };
};

export type GetBookmark = {
  type: BookmarksActionType.GET_BOOKMARK;
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
  | GetAllBookmarks
  | GetBookmark
  | BookmarkAdded
  | BookmarkEdited
  | BookmarksLoading
  | BookmarksError;
