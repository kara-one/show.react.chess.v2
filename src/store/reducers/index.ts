import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  chess: boardReducer,
  user: userReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
