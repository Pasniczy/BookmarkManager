import { UserEntity } from 'Models';
import { Nullable } from 'Types';
import { AuthAction, AuthActionType } from 'ActionTypes';

export interface AuthState {
  // TODO: Remove details from register response
  user: Nullable<UserEntity>;
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
    case AuthActionType.REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionType.USER_REGISTERED:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
