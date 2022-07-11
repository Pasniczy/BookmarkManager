import { LoadUserResponseData } from 'Models';
import { Nullable } from 'Types';
import { AuthAction, AuthActionType } from 'ActionTypes';

export interface AuthState {
  user: Nullable<LoadUserResponseData>;
  loading: boolean;
  errors: {
    register: Nullable<string>;
    login: Nullable<string>;
    loading: Nullable<string>;
  };
}

const initialState: AuthState = {
  user: null,
  loading: true,
  errors: {
    register: null,
    login: null,
    loading: null,
  },
};

const resetState = {
  loading: false,
  errors: {
    register: null,
    login: null,
    loading: null,
  },
};

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.USER_LOADED:
      return {
        ...state,
        ...resetState,
        user: action.payload.user,
      };
    case AuthActionType.USER_LOGGED_OUT:
      return {
        ...state,
        ...resetState,
        user: null,
      };
    case AuthActionType.USER_LOADING:
      return {
        ...state,
        ...resetState,
        loading: true,
      };
    case AuthActionType.USER_REGISTER_ERROR:
      return {
        ...state,
        ...resetState,
        errors: {
          register: action.payload.error,
          login: null,
          loading: null,
        },
      };
    case AuthActionType.USER_LOGIN_ERROR:
      return {
        ...state,
        ...resetState,
        errors: {
          register: null,
          login: action.payload.error,
          loading: null,
        },
      };
    case AuthActionType.USER_LOADING_ERROR:
      return {
        ...state,
        ...resetState,
        errors: {
          register: null,
          login: null,
          loading: action.payload.error,
        },
      };
    default:
      return state;
  }
};
