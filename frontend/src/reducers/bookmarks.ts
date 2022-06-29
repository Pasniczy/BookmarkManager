import { BookmarkEntity } from 'Models';
import { Nullable } from '../types';
import { BookmarksAction, BookmarksActionType } from '../actions/types';

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
  loading: true,
  error: null,
};

export const bookmarksReducer = (state: BookmarksState = initialState, action: BookmarksAction) => {
  switch (action.type) {
    case BookmarksActionType.GET_BOOKMARKS:
      return { ...state, ...resetState, bookmarks: action.payload.bookmarks };
    case BookmarksActionType.GET_BOOKMARK:
    case BookmarksActionType.BOOKMARK_ADDED:
      return { ...state, ...resetState, bookmark: action.payload.bookmark };
    case BookmarksActionType.BOOKMARKS_LOADING:
      return { ...state, ...resetState, loading: true };
    case BookmarksActionType.BOOKMARKS_ERROR:
      return { ...state, ...resetState, error: action.payload.error };
    default:
      return state;
  }
};
