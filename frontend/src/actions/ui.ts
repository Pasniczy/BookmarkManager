import { Dispatch } from 'redux';
import { AlertType, UiAction, UiActionType } from 'ActionTypes';

export const setAlert = (type: AlertType, message: string) => (dispatch: Dispatch<UiAction>) => {
  dispatch({ type: UiActionType.SET_ALERT, payload: { type, message } });
};

export const clearAlert = () => (dispatch: Dispatch<UiAction>) => {
  dispatch({ type: UiActionType.CLEAR_ALERT });
};
