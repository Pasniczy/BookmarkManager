import { BookmarkEntity } from 'Models';
import { Nullable } from 'Types';
import { BookmarksAction, BookmarksActionType } from 'ActionTypes';

interface BookmarksResetState {
  bookmark: Nullable<BookmarkEntity>;
  loading: boolean;
  // TODO: Model errors
  error: Nullable<string>;
}

export interface BookmarksState extends BookmarksResetState {
  bookmarks: BookmarkEntity[];
}

const resetState: BookmarksResetState = {
  bookmark: null,
  loading: false,
  error: null,
};

const initialState: BookmarksState = {
  bookmarks: [],
  bookmark: null,
  loading: false,
  error: null,
};

export const bookmarksReducer = (state: BookmarksState = initialState, action: BookmarksAction): BookmarksState => {
  switch (action.type) {
    case BookmarksActionType.BOOKMARKS_LOADED:
      return {
        ...state,
        ...resetState,
        bookmarks: action.payload.bookmarks,
      };
    case BookmarksActionType.BOOKMARK_LOADED:
      return {
        ...state,
        ...resetState,
        bookmark: action.payload.bookmark,
      };
    case BookmarksActionType.BOOKMARK_ADDED:
      return {
        ...state,
        ...resetState,
        bookmark: action.payload.bookmark,
        bookmarks: [action.payload.bookmark, ...state.bookmarks],
      };
    case BookmarksActionType.BOOKMARK_EDITED:
      return {
        ...state,
        ...resetState,
        bookmarks: state.bookmarks.map((bookmark) => {
          if (bookmark.id === action.payload.id) return action.payload.bookmark;
          return bookmark;
        }),
      };
    case BookmarksActionType.BOOKMARK_DELETED:
      return {
        ...state,
        ...resetState,
        bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== action.payload.id),
      };
    case BookmarksActionType.BOOKMARKS_LOADING:
      return {
        ...state,
        ...resetState,
        loading: true,
      };
    case BookmarksActionType.BOOKMARKS_ERROR:
      return {
        ...state,
        ...resetState,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
