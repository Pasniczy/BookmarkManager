import { createStore, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const middlewares = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
