import { combineReducers } from 'redux';
import { bookmarksReducer } from 'Reducers/bookmarks';
import { authReducer } from 'Reducers/auth';
import { uiReducer } from 'Reducers/ui';

export const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  auth: authReducer,
  ui: uiReducer,
});
