import { LoadUserResponseData } from 'Models';
import { Nullable } from 'Types';
import { AuthAction, AuthActionType } from 'ActionTypes';

interface AuthResetState {
  loading: boolean;
  errors: {
    register: Nullable<string>;
    login: Nullable<string>;
  };
}

export interface AuthState extends AuthResetState {
  user: Nullable<LoadUserResponseData>;
}

const resetState: AuthResetState = {
  loading: false,
  errors: {
    register: null,
    login: null,
  },
};

const initialState: AuthState = {
  user: null,
  loading: true,
  errors: {
    register: null,
    login: null,
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
        },
      };
    case AuthActionType.USER_LOGIN_ERROR:
      return {
        ...state,
        ...resetState,
        errors: {
          register: null,
          login: action.payload.error,
        },
      };
    default:
      return state;
  }
};
