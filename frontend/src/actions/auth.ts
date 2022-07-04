import { NavigateFunction } from 'react-router';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { UserEntity, NewUserEntity } from 'Models';
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
    };
    try {
      dispatch({
        type: AuthActionType.USER_LOADING,
      });
      const res = await axios.post('http://localhost:3001/auth/register', JSON.stringify(user), config);
      const registeredUser = res.data as UserEntity;
      dispatch({
        type: AuthActionType.USER_REGISTERED,
        payload: { user: registeredUser },
      });
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
