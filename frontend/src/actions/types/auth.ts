import { LoadUserResponseData } from 'Models';

export enum AuthActionType {
  USER_LOADED = 'USER_LOADED',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
  USER_LOADING = 'USER_LOADING',
  USER_REGISTER_ERROR = 'USER_REGISTER_ERROR',
  USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
  USER_LOADING_ERROR = 'USER_LOADING_ERROR',
}

export type UserLoaded = {
  type: AuthActionType.USER_LOADED;
  payload: {
    user: LoadUserResponseData;
  };
};

export type UserLoggedOut = {
  type: AuthActionType.USER_LOGGED_OUT;
};

export type UserLoading = {
  type: AuthActionType.USER_LOADING;
};

export type UserRegisterError = {
  type: AuthActionType.USER_REGISTER_ERROR;
  payload: {
    error: string;
  };
};

export type UserLoginError = {
  type: AuthActionType.USER_LOGIN_ERROR;
  payload: {
    error: string;
  };
};

export type UserLoadingError = {
  type: AuthActionType.USER_LOADING_ERROR;
  payload: {
    error: string;
  };
};

export type AuthAction =
  | UserLoaded
  | UserLoggedOut
  | UserLoading
  | UserRegisterError
  | UserLoginError
  | UserLoadingError;
