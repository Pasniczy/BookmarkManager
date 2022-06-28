import { BookmarkEntity } from 'Models';
import { Nullable } from '../types';
import { BookmarksAction, BookmarksActionType } from '../actions/types';

export interface BookmarksState {
  bookmarks: BookmarkEntity[];
  bookmark: Nullable<BookmarkEntity>;
  loading: boolean;
  // TODO: Model errors
  error: Nullable<string>;
}

const initialState: BookmarksState = {
  bookmarks: [],
  bookmark: null,
  loading: true,
  error: null,
};

export const bookmarksReducer = (state: BookmarksState = initialState, action: BookmarksAction) => {
  switch (action.type) {
    case BookmarksActionType.GET_BOOKMARKS:
      return { ...state, bookmarks: action.payload.bookmarks, loading: false, error: null };
    case BookmarksActionType.GET_BOOKMARK:
      return { ...state, bookmark: action.payload.bookmark, loading: false, error: null };
    case BookmarksActionType.BOOKMARK_LOADING:
      return { ...state, loading: true, error: null };
    case BookmarksActionType.BOOKMARKS_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
