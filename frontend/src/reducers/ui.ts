import { Nullable } from 'Types';
import { UiAction, UiActionType } from 'ActionTypes';

export interface UiState {
  alert: Nullable<{
    type: 'success' | 'warning' | 'error';
    message: string;
  }>;
}

const initialState: UiState = {
  alert: null,
};

export const uiReducer = (state: UiState = initialState, action: UiAction): UiState => {
  switch (action.type) {
    case UiActionType.SET_ALERT:
      return {
        ...state,
        alert: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    case UiActionType.CLEAR_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};
