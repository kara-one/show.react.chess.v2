import { Dispatch } from 'react';
import {
  BoardActions,
  BoardActionTypes,
} from '../../../types/typesBoard/typesBoardActions';
import {
  History,
} from '../../../types/typesBoard/typesBoardHistory';
import { boardUtils } from '../../../utils/boardUtils';
import { RootReducer } from '../../reducers';
import { EMPTY } from '../../initialState';

const boardCheckmateAction = (): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {
    const { chess } = getState() as RootReducer;
    const copyChess = boardUtils.clone(chess);

    if (copyChess.selectSquare === EMPTY) {
      if (copyChess.history !== undefined && copyChess.history.length > 0) {
        const lastHistory: History =
          copyChess.history[copyChess.history.length - 1];

        const isCheckmate = boardUtils.isCheckmate(copyChess.board, lastHistory);
        dispatch({
          type: BoardActionTypes.BOARD_CHECKMATE,
          checkmate: isCheckmate,
        });
      }
    }
  };
};
export default boardCheckmateAction;
