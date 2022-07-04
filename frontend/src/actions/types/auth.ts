export enum AuthActionType {
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
  USER_LOADING = 'USER_LOADING',
  USER_ERROR = 'USER_ERROR',
}

export type UserRegistered = {
  type: AuthActionType.USER_REGISTERED;
  payload: {
    token: string;
  };
};

export type UserLoggedIn = {
  type: AuthActionType.USER_LOGGED_IN;
  payload: {
    token: string;
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

export type AuthAction = UserRegistered | UserLoggedIn | UserLoggedOut | UserLoading | UserError;
