import { IUserState } from './typesUserState';

/** ACTIONS */
export enum UserActionTypes {
  USER_UUID = 'USER_UUID',
}

interface UserUUIDAction {
  type: UserActionTypes.USER_UUID;
  uuid: IUserState['uuid'];
}

export type UserActions = UserUUIDAction;
