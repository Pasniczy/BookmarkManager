import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { BookmarkEntity, NewBookmarkData } from 'Models';
import { RootState } from 'Store';
import { BookmarksActionType, BookmarksAction, UiAction } from 'ActionTypes';
import { setAlert } from './ui';

const bookmarksLoading = (): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARKS_LOADING,
});

const bookmarksLoaded = (bookmarks: BookmarkEntity[]): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARKS_LOADED,
  payload: { bookmarks },
});

const bookmarkLoaded = (bookmark: BookmarkEntity): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARK_LOADED,
  payload: { bookmark },
});

const bookmarkAdded = (bookmark: BookmarkEntity): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARK_ADDED,
  payload: { bookmark },
});

const bookmarkEdited = (id: string, bookmark: BookmarkEntity): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARK_EDITED,
  payload: { id, bookmark },
});

const bookmarkDeleted = (id: string): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARK_DELETED,
  payload: { id },
});

const bookmarkError = (error: string): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARKS_ERROR,
  payload: { error },
});

export const getBookmarks = (
  name?: string,
  shouldSearchFavorites?: boolean
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch) => {
    const config = {
      withCredentials: true,
    };
    try {
      dispatch(bookmarksLoading());
      const searchNameQuery = name ? `name=${encodeURIComponent(name)}` : '';
      const searchFavoritesQuery = shouldSearchFavorites ? 'favorites' : '';
      const queryUrl = [searchNameQuery, searchFavoritesQuery].filter((query) => query !== '').join('&');
      const url = queryUrl ? `http://localhost:3001/bookmarks?${queryUrl}` : 'http://localhost:3001/bookmarks';
      const res = await axios.get(url, config);
      const bookmarks = res.data as BookmarkEntity[];
      dispatch(bookmarksLoaded(bookmarks));
    } catch (err) {
      console.error(err);
      dispatch(bookmarkError('Failed to fetch bookmarks'));
    }
  };
};

export const getBookmark = (
  id: BookmarkEntity['id']
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch) => {
    const config = {
      withCredentials: true,
    };
    try {
      dispatch(bookmarksLoading());
      const res = await axios.get(`http://localhost:3001/bookmarks/${id}`, config);
      const bookmark = res.data as BookmarkEntity;
      dispatch(bookmarkLoaded(bookmark));
    } catch (err) {
      console.error(err);
      dispatch(bookmarkError('Failed to fetch bookmark'));
    }
  };
};

export const addBookmark = (
  newBookmark: NewBookmarkData,
  navigate: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction | UiAction> => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    try {
      dispatch(bookmarksLoading());
      const res = await axios.post('http://localhost:3001/bookmarks', newBookmark, config);
      const bookmark = res.data as BookmarkEntity;
      dispatch(bookmarkAdded(bookmark));
      dispatch(setAlert('success', 'Bookmark edited!'));
      navigate(`/bookmarks/${bookmark.id}`);
    } catch (err) {
      console.error(err);
      dispatch(bookmarkError('Failed to add bookmark'));
    }
  };
};

export const editBookmark = (
  id: string,
  editedBookmark: NewBookmarkData,
  navigate?: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction | UiAction> => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    try {
      dispatch(bookmarksLoading());
      const res = await axios.put(`http://localhost:3001/bookmarks/${id}`, editedBookmark, config);
      const bookmark = res.data as BookmarkEntity;
      dispatch(bookmarkEdited(id, bookmark));
      dispatch(setAlert('success', 'Bookmark edited!'));
      if (navigate) navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch(bookmarkError('Failed to edit bookmark'));
    }
  };
};

export const deleteBookmark = (
  id: string,
  navigate?: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction | UiAction> => {
  return async (dispatch) => {
    const config = {
      withCredentials: true,
    };
    try {
      dispatch(bookmarksLoading());
      await axios.delete(`http://localhost:3001/bookmarks/${id}`, config);
      dispatch(bookmarkDeleted(id));
      dispatch(setAlert('error', 'Bookmark deleted!'));
      if (navigate) navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch(bookmarkError('Failed to delete bookmark'));
    }
  };
};
