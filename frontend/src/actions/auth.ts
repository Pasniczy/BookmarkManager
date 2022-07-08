import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { NewUserEntity, LoginUserRequestData, LoadUserResponseData } from 'Models';
import { RootState } from 'Store';
import { AuthAction, AuthActionType } from 'ActionTypes';
import { getBookmarks } from 'Actions';

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
    const config = {
      withCredentials: true,
    };
    try {
      const res = await axios.get('http://localhost:3001/auth', config);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    try {
      dispatch(userLoading());
      await axios.post('http://localhost:3001/auth/register', JSON.stringify(user), config);
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    try {
      dispatch(userLoading());
      await axios.post('http://localhost:3001/auth/login', JSON.stringify(loginData), config);
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
    const config = {
      withCredentials: true,
    };
    try {
      await axios.get('http://localhost:3001/auth/logout', config);
      dispatch(userLoggedOut());
      navigate('/');
    } catch (err) {
      console.error(err);
      dispatch(userError('Failed to logout user'));
    }
  };
};
