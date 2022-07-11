import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import { NewUserEntity, LoginUserRequestData, LoadUserResponseData } from 'Models';
import { RootState } from 'Store';
import { AuthAction, AuthActionType } from 'ActionTypes';
import { getBookmarks } from 'Actions';
import { axiosClient } from 'Utils/axiosClient';

const userLoading = (): AuthAction => ({
  type: AuthActionType.USER_LOADING,
});

const userLoaded = (user: LoadUserResponseData): AuthAction => ({
  type: AuthActionType.USER_LOADED,
  payload: { user },
});

const userLoggedOut = (): AuthAction => ({
  type: AuthActionType.USER_LOGGED_OUT,
});

const userError = (error: string): AuthAction => ({
  type: AuthActionType.USER_ERROR,
  payload: { error },
});

export const loadUser = (): ThunkAction<Promise<void>, RootState, unknown, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await axiosClient.get('/auth');
      const data = res.data as { user: LoadUserResponseData };
      const user = data.user;
      dispatch(userLoaded(user));
      dispatch(getBookmarks());
    } catch (err) {
      console.error(err);
      dispatch(userError('Failed to load user'));
    }
  };
};

export const registerUser = (
  user: NewUserEntity,
  navigate: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(userLoading());
      await axiosClient.post('/auth/register', JSON.stringify(user));
      await dispatch(loadUser());
      navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch(userError('Failed to register user'));
    }
  };
};

export const loginUser = (
  loginData: LoginUserRequestData,
  navigate: NavigateFunction
): ThunkAction<Promise<void>, RootState, unknown, AuthAction> => {
  return async (dispatch) => {
    try {
      dispatch(userLoading());
      await axiosClient.post('/auth/login', JSON.stringify(loginData));
      await dispatch(loadUser());
      navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch(userError('Failed to login user'));
    }
  };
};

export const logoutUser = (navigate: NavigateFunction): ThunkAction<Promise<void>, RootState, unknown, AuthAction> => {
  return async (dispatch) => {
    try {
      await axiosClient.get('/auth/logout');
      dispatch(userLoggedOut());
      navigate('/');
    } catch (err) {
      console.error(err);
      dispatch(userError('Failed to logout user'));
    }
  };
};
