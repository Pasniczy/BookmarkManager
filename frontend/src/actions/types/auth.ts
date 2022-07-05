import { LoadUserResponseData } from 'Models';

export enum AuthActionType {
  USER_LOADED = 'USER_LOADED',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
  USER_LOADING = 'USER_LOADING',
  USER_ERROR = 'USER_ERROR',
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

export type UserError = {
  type: AuthActionType.USER_ERROR;
  payload: {
    error: string;
  };
};

export type AuthAction = UserLoaded | UserLoggedOut | UserLoading | UserError;
