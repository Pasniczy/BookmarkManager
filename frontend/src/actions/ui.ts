import { ThunkAction } from 'redux-thunk';
import { RootState } from 'Store';
import { AlertType, UiAction, UiActionType } from 'ActionTypes';

export const clearAlert = (): UiAction => ({
  type: UiActionType.CLEAR_ALERT,
});

export const setAlert = (type: AlertType, message: string): ThunkAction<void, RootState, unknown, UiAction> => {
  return (dispatch) => {
    dispatch({ type: UiActionType.SET_ALERT, payload: { type, message } });
    setTimeout(() => dispatch(clearAlert()), 3000);
  };
};
