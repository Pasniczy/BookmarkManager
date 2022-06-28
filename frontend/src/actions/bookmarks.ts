import axios from 'axios';
import { Dispatch } from 'react';
import { BookmarkEntity } from 'Models';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'src/store';
import { BookmarksAction, BookmarksActionType } from './types';

export const getBookmarks = (): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARK_LOADING,
      });
      const res = await axios.get('http://localhost:3001/bookmarks');
      const bookmarks = res.data as BookmarkEntity[];
      dispatch({
        type: BookmarksActionType.GET_BOOKMARKS,
        payload: { bookmarks },
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: BookmarksActionType.BOOKMARKS_ERROR,
        payload: { error: 'Failed to fetch bookmarks' },
      });
    }
  };
};

export const getBookmark = (
  id: BookmarkEntity['id']
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch: Dispatch<BookmarksAction>) => {
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARK_LOADING,
      });
      const res = await axios.get(`http://localhost:3001/bookmarks/${id}`);
      const bookmark = res.data as BookmarkEntity;
      dispatch({
        type: BookmarksActionType.GET_BOOKMARK,
        payload: { bookmark },
      });
    } catch (err) {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_ERROR,
        payload: { error: 'Failed to fetch bookmarks' },
      });
    }
  };
};
