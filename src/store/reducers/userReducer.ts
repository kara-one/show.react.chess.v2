
import { UserActions, UserActionTypes } from '../../types/typesUser/typesUserActions';
import { IUserState } from '../../types/typesUser/typesUserState';
import { initiaUserlState } from '../initialUserState';

export const userReducer = (
  state = initiaUserlState,
  action: UserActions,
): IUserState => {
  switch (action.type) {
    case UserActionTypes.USER_UUID:
      return { ...state, uuid: action.uuid };
    default:
      return state;
  }
};
