import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { BookmarkEntity, NewBookmarkEntity } from 'Models';
import { RootState } from 'Store';
import { BookmarksAction, BookmarksActionType } from 'ActionTypes';

export const getBookmarks = (): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch) => {
    const config = {
      withCredentials: true,
    };
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADING,
      });
      const res = await axios.get('http://localhost:3001/bookmarks', config);
      const bookmarks = res.data as BookmarkEntity[];
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADED,
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
    const config = {
      withCredentials: true,
    };
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADING,
      });
      const res = await axios.get(`http://localhost:3001/bookmarks/${id}`, config);
      const bookmark = res.data as BookmarkEntity;
      dispatch({
        type: BookmarksActionType.BOOKMARK_LOADED,
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
      withCredentials: true,
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
      withCredentials: true,
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
    const config = {
      withCredentials: true,
    };
    try {
      dispatch({
        type: BookmarksActionType.BOOKMARKS_LOADING,
      });
      await axios.delete(`http://localhost:3001/bookmarks/${id}`, config);
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
