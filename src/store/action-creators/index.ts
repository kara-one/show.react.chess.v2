import { boardActions } from './boardActions/';
import { userActions } from './userActions';

export const actionCreators = {
  ...boardActions,
  ...userActions,
};
