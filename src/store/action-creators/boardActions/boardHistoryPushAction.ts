import { Dispatch } from 'react';
import {
  BoardActions,
  BoardActionTypes,
} from '../../../types/typesBoard/typesBoardActions';
import { HistoryMove } from '../../../types/typesBoard/typesBoardHistory';
import { boardUtils } from '../../../utils/boardUtils';
import { RootReducer } from '../../reducers';

const boardHistoryPushAction = (move: HistoryMove): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {
    // Get State
    const { chess } = getState() as RootReducer;
    const copyChess = boardUtils.clone(chess);

    const lastHistory = {
      move: move,
      kings: copyChess.kings,
      turn: copyChess.turn,
      castling: copyChess.castling,
      ep_square: copyChess.ep_square,
      half_moves: copyChess.half_moves,
      move_number: copyChess.move_number,
      checkmate: copyChess.checkmate,
    };

    const isCheckmate = boardUtils.isCheckmate(copyChess.board, lastHistory);
    dispatch({
      type: BoardActionTypes.BOARD_CHECKMATE,
      checkmate: isCheckmate,
    });

    lastHistory.checkmate = isCheckmate;
    copyChess.history.push(lastHistory);

    dispatch({
      type: BoardActionTypes.BOARD_HISTORY,
      history: copyChess.history,
    });
  };
};

export default boardHistoryPushAction;
