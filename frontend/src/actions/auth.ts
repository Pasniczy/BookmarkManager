import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { NewUserEntity, LoginUserRequestData, LoadUserResponseData } from 'Models';
import { RootState } from 'Store';
import { AuthAction, AuthActionType } from 'ActionTypes';

export const loadUser = (): ThunkAction<Promise<void>, RootState, unknown, AuthAction> => {
  return async (dispatch) => {
    const config = {
      withCredentials: true,
    };
    try {
      const res = await axios.get('http://localhost:3001/auth', config);
      const user = res.data as LoadUserResponseData;
      dispatch({
        type: AuthActionType.USER_LOADED,
        payload: { user },
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: AuthActionType.USER_ERROR,
        payload: { error: 'Failed to load user' },
      });
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
      dispatch({
        type: AuthActionType.USER_LOADING,
      });
      await axios.post('http://localhost:3001/auth/register', JSON.stringify(user), config);
      await dispatch(loadUser());
      navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch({
        type: AuthActionType.USER_ERROR,
        payload: { error: 'Failed to register user' },
      });
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
      dispatch({
        type: AuthActionType.USER_LOADING,
      });
      await axios.post('http://localhost:3001/auth/login', JSON.stringify(loginData), config);
      await dispatch(loadUser());
      navigate('/bookmarks');
    } catch (err) {
      console.error(err);
      dispatch({
        type: AuthActionType.USER_ERROR,
        payload: { error: 'Failed to login user' },
      });
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
      dispatch({
        type: AuthActionType.USER_LOGGED_OUT,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      dispatch({
        type: AuthActionType.USER_ERROR,
        payload: { error: 'Failed to logout user' },
      });
    }
  };
};
