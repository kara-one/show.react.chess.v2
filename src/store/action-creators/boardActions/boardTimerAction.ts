import { Dispatch } from 'react';
import {
  BoardActions,
  BoardActionTypes,
} from '../../../types/typesBoard/typesBoardActions';
import { COLORS } from '../../../types/typesBoard/typesBoardFigures';
import { boardUtils } from '../../../utils/boardUtils';
import { RootReducer } from '../../reducers';

const boardTimerAction = (time: number, color: `${COLORS}`): Function => {
  return (
    dispatch: Dispatch<BoardActions | Function>,
    getState: Function,
  ): void => {
    const { chess } = getState() as RootReducer;
    const copyTimer = boardUtils.clone(chess.timer);

    copyTimer[color] = time;
    dispatch({ type: BoardActionTypes.BOARD_TIMER, timer: copyTimer });
  };
};

export default boardTimerAction;
