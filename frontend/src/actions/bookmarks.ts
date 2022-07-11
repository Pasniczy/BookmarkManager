import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import { BookmarkEntity, NewBookmarkData } from 'Models';
import { RootState } from 'Store';
import { BookmarksActionType, BookmarksAction, UiAction } from 'ActionTypes';
import { axiosClient } from 'Utils/axiosClient';
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

const bookmarksError = (error: string): BookmarksAction => ({
  type: BookmarksActionType.BOOKMARKS_ERROR,
  payload: { error },
});

export const getBookmarks = (
  name?: string,
  shouldSearchFavorites?: boolean
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch) => {
    try {
      dispatch(bookmarksLoading());
      const searchNameQuery = name ? `name=${encodeURIComponent(name)}` : '';
      const searchFavoritesQuery = shouldSearchFavorites ? 'favorites' : '';
      const queryUrl = [searchNameQuery, searchFavoritesQuery].filter((query) => query !== '').join('&');
      const url = queryUrl ? `/bookmarks?${queryUrl}` : '/bookmarks';
      const res = await axiosClient.get(url);
      const bookmarks = res.data as BookmarkEntity[];
      dispatch(bookmarksLoaded(bookmarks));
    } catch (err) {
      dispatch(bookmarksError('Failed to load bookmarks'));
    }
  };
};

export const getBookmark = (
  id: BookmarkEntity['id']
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction> => {
  return async (dispatch) => {
    try {
      dispatch(bookmarksLoading());
      const res = await axiosClient.get(`/bookmarks/${id}`);
      const bookmark = res.data as BookmarkEntity;
      dispatch(bookmarkLoaded(bookmark));
    } catch (err) {
      dispatch(bookmarksError('Failed to load bookmark'));
    }
  };
};

export const addBookmark = (
  newBookmark: NewBookmarkData,
  navigate: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction | UiAction> => {
  return async (dispatch) => {
    try {
      dispatch(bookmarksLoading());
      const res = await axiosClient.post('/bookmarks', newBookmark);
      const bookmark = res.data as BookmarkEntity;
      dispatch(bookmarkAdded(bookmark));
      dispatch(setAlert('success', 'Bookmark edited!'));
      navigate(`/bookmarks/${bookmark.id}`);
    } catch (err) {
      dispatch(setAlert('error', 'Failed to add bookmark'));
    }
  };
};

export const editBookmark = (
  id: string,
  editedBookmark: NewBookmarkData,
  navigate?: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction | UiAction> => {
  return async (dispatch) => {
    try {
      dispatch(bookmarksLoading());
      const res = await axiosClient.put(`/bookmarks/${id}`, editedBookmark);
      const bookmark = res.data as BookmarkEntity;
      dispatch(bookmarkEdited(id, bookmark));
      dispatch(setAlert('success', 'Bookmark edited!'));
      if (navigate) navigate('/bookmarks');
    } catch (err) {
      dispatch(setAlert('error', 'Failed to edit bookmark'));
    }
  };
};

export const deleteBookmark = (
  id: string,
  navigate?: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, BookmarksAction | UiAction> => {
  return async (dispatch) => {
    try {
      dispatch(bookmarksLoading());
      await axiosClient.delete(`/bookmarks/${id}`);
      dispatch(bookmarkDeleted(id));
      dispatch(setAlert('error', 'Bookmark deleted!'));
      if (navigate) navigate('/bookmarks');
    } catch (err) {
      dispatch(setAlert('error', 'Failed to delete bookmark'));
    }
  };
};
