import { Dispatch } from 'react';
import {
  BoardActions,
  BoardActionTypes,
} from '../../../types/typesBoard/typesBoardActions';
import { PropsMove } from '../../../types/typesBoard/typesBoardState';
import { boardUtils } from '../../../utils/boardUtils';
import { EMPTY } from '../../initialBoardState';
import { RootReducer } from '../../reducers';
import boardHistoryPushAction from './boardHistoryPushAction';

/**
 * @implements make_move()
 * @param {HistoryMove} move
 * @returns {void} void
 */
const boardMakeMoveAction = (square: number): Function => {
  return (
    dispatch: Dispatch<BoardActions | Function>,
    getState: Function,
  ): void => {
    // Get State
    const { chess } = getState() as RootReducer;
    const move = chess.availables.find((item) => item.to === square);
    const copyChess = boardUtils.clone(chess);
    // console.log('move: ', move);
    if (!move) return;

    const chessData: PropsMove = {
      turn: copyChess.turn,
      board: copyChess.board,
      castling: copyChess.castling,
      ep_square: copyChess.ep_square,
      half_moves: copyChess.half_moves,
      kings: copyChess.kings,
      move_number: copyChess.move_number,
    };
    const chessMakeMove: PropsMove = boardUtils.makeMove(move, chessData);

    if (chessData.turn !== chessMakeMove.turn) {
      dispatch({ type: BoardActionTypes.BOARD_TURN, turn: chessMakeMove.turn });
    }
    dispatch({ type: BoardActionTypes.BOARD_ITEM, board: chessMakeMove.board });
    dispatch({
      type: BoardActionTypes.BOARD_CASTLING,
      castling: chessMakeMove.castling,
    });
    dispatch({
      type: BoardActionTypes.BOARD_EP_SQUARE,
      epSquare: chessMakeMove.ep_square,
    });
    dispatch({
      type: BoardActionTypes.BOARD_HALF_MOVES,
      halfMoves: chessMakeMove.half_moves,
    });
    dispatch({
      type: BoardActionTypes.BOARD_KINGS,
      kings: chessMakeMove.kings,
    });
    dispatch({
      type: BoardActionTypes.BOARD_MOVE_NUMBER,
      moveNumber: chessMakeMove.move_number,
    });
    dispatch({
      type: BoardActionTypes.BOARD_SELECT_CELL,
      selectSquare: EMPTY,
    });
    dispatch({
      type: BoardActionTypes.BOARD_AVAILABLES,
      availables: [],
    });

    dispatch(boardHistoryPushAction(move));
  };
};

export default boardMakeMoveAction;
