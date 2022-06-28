import { BookmarkEntity } from 'Models';

export enum BookmarksActionType {
  GET_BOOKMARKS = 'GET_BOOKMARKS',
  GET_BOOKMARK = 'GET_BOOKMARK',
  BOOKMARK_LOADING = 'BOOKMARKS_LOADING',
  BOOKMARKS_ERROR = 'BOOKMARK_ERROR',
}

export type GetAllBookmarksAction = {
  type: BookmarksActionType.GET_BOOKMARKS;
  payload: {
    bookmarks: BookmarkEntity[];
  };
};

export type GetBookmarkAction = {
  type: BookmarksActionType.GET_BOOKMARK;
  payload: {
    bookmark: BookmarkEntity;
  };
};

export type BookmarksLoading = {
  type: BookmarksActionType.BOOKMARK_LOADING;
};

export type BookmarkError = {
  type: BookmarksActionType.BOOKMARKS_ERROR;
  payload: {
    error: string;
  };
};

export type BookmarksAction = GetAllBookmarksAction | GetBookmarkAction | BookmarksLoading | BookmarkError;
