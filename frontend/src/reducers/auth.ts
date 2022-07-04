import { UserEntity } from 'Models';
import { Nullable } from 'Types';
import { AuthAction, AuthActionType } from 'ActionTypes';

export interface AuthState {
  token: Nullable<string>;
  user: Nullable<UserEntity>;
  loading: boolean;
  // TODO: Model error
  error: Nullable<string>;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.USER_LOGGED_IN:
    case AuthActionType.USER_REGISTERED:
      return {
        ...state,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case AuthActionType.USER_LOGGED_OUT:
      return {
        ...state,
        token: null,
        loading: false,
        error: null,
      };
    case AuthActionType.USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};
