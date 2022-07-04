import { UserEntity } from 'Models';

export enum AuthActionType {
  REGISTER_USER = 'REGISTER_USER',
  USER_REGISTERED = 'USER_REGISTERED',
  USER_LOADING = 'USER_LOADING',
  USER_ERROR = 'USER_ERROR',
}

export type RegisterUser = {
  type: AuthActionType.REGISTER_USER;
};

export type UserRegistered = {
  type: AuthActionType.USER_REGISTERED;
  payload: {
    // TODO: Remove details from register response
    user: UserEntity;
  };
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

export type AuthAction = RegisterUser | UserRegistered | UserLoading | UserError;
