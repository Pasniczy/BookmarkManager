import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { RootState } from 'src/store';
import { BookmarkEntity, NewBookmarkEntity } from 'Models';
import { BookmarksAction, BookmarksActionType } from './types';

export const getBookmarks = (): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch) => {
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADING,
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
        type: BookmarksActionType.BOOKMARKS_LOADING,
      });
      const res = await axios.get(`http://localhost:3001/bookmarks/${id}`);
      const bookmark = res.data as BookmarkEntity;
      dispatch({
        type: BookmarksActionType.GET_BOOKMARK,
        payload: { bookmark },
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

export const addBookmark = (
  newBookmark: NewBookmarkEntity,
  navigate: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch: Dispatch<BookmarksAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADING,
      });
      const res = await axios.post('http://localhost:3001/bookmarks', newBookmark, config);
      const bookmark = res.data as BookmarkEntity;
      dispatch({
        type: BookmarksActionType.BOOKMARK_ADDED,
        payload: { bookmark },
      });
      navigate(`/bookmarks/${bookmark.id}`);
    } catch (err) {
      console.error(err);
      dispatch({
        type: BookmarksActionType.BOOKMARKS_ERROR,
        payload: { error: 'Failed to add bookmark' },
      });
    }
  };
};

export const editBookmark = (
  id: string,
  editedBookmark: NewBookmarkEntity,
  navigate?: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch: Dispatch<BookmarksAction>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADING,
      });
      const res = await axios.put(`http://localhost:3001/bookmarks/${id}`, editedBookmark, config);
      const bookmark = res.data as BookmarkEntity;
      dispatch({
        type: BookmarksActionType.BOOKMARK_EDITED,
        payload: { id, bookmark },
      });
      if (navigate) navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch({
        type: BookmarksActionType.BOOKMARKS_ERROR,
        payload: { error: 'Failed to edit bookmark' },
      });
    }
  };
};

export const deleteBookmark = (
  id: string,
  navigate?: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch: Dispatch<BookmarksAction>) => {
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADING,
      });
      await axios.delete(`http://localhost:3001/bookmarks/${id}`);
      dispatch({
        type: BookmarksActionType.BOOKMARK_DELETED,
        payload: { id },
      });
      if (navigate) navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch({
        type: BookmarksActionType.BOOKMARKS_ERROR,
        payload: { error: 'Failed to edit bookmark' },
      });
    }
  };
};
