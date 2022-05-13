import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';

export const rootReducer = combineReducers({
  chess: boardReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
