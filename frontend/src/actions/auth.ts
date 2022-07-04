import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { NewUserEntity, UserLoginRequestData } from 'Models';
import { RootState } from 'Store';
import { AuthAction, AuthActionType } from 'ActionTypes';

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
      const res = await axios.post('http://localhost:3001/auth/register', JSON.stringify(user), config);
      const data = res.data as { message: string; token: string };
      const token = data.token;
      dispatch({
        type: AuthActionType.USER_REGISTERED,
        payload: { token },
      });
      // TODO: load user
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
  loginData: UserLoginRequestData,
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
      const res = await axios.post('http://localhost:3001/auth/login', loginData, config);
      const data = res.data as { message: string; token: string };
      const token = data.token;
      dispatch({
        type: AuthActionType.USER_LOGGED_IN,
        payload: { token },
      });
      // TODO: load user
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
