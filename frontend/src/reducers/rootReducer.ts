import { combineReducers } from 'redux';
import { bookmarksReducer } from 'Reducers/bookmarks';
import { authReducer } from 'Reducers/auth';

export const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  auth: authReducer,
});
