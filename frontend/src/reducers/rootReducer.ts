import { combineReducers } from 'redux';
import { bookmarksReducer } from 'Reducers/bookmarks';

export const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
});
