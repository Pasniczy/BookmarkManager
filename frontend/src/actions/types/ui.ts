export enum UiActionType {
  SET_ALERT = 'SET_ALERT',
  CLEAR_ALERT = 'CLEAR_ALERT',
}

export type AlertType = 'success' | 'warning' | 'error';

export type SetAlert = {
  type: UiActionType.SET_ALERT;
  payload: {
    type: AlertType;
    message: string;
  };
};

export type ClearAlert = {
  type: UiActionType.CLEAR_ALERT;
};

export type UiAction = SetAlert | ClearAlert;
