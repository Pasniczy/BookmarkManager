import { LoadUserResponseData } from 'Models';
import { Nullable } from 'Types';
import { AuthAction, AuthActionType } from 'ActionTypes';

export interface AuthState {
  user: Nullable<LoadUserResponseData>;
  loading: boolean;
  // TODO: Model error
  error: Nullable<string>;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.USER_LOADED:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case AuthActionType.USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case AuthActionType.USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionType.USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
