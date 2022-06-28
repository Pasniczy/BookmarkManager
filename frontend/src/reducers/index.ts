import { combineReducers } from 'redux';
import { bookmarksReducer } from './bookmarks';

export const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
});
