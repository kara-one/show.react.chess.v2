import { Dispatch } from 'react';
import {
  BoardActions,
  BoardActionTypes,
} from '../../../types/typesBoard/typesBoardActions';
import { FIGURES } from '../../../types/typesBoard/typesBoardFigures';
import { BoardItem, SQUARES } from '../../../types/typesBoard/typesBoardState';
import { boardUtils } from '../../../utils/boardUtils';
import { EMPTY } from '../../initialBoardState';
import { RootReducer } from '../../reducers';

/**
 * Insert changes into one board cell
 * @Implementation Chess.put()
 * @param {BoardItem} piece
 * @param {keyof typeof SQUARES} square
 * @returns {Function}
 */
const boardPutCellAction = (
  piece: BoardItem,
  square: keyof typeof SQUARES,
): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {
    const sq = SQUARES[square];
    const { chess } = getState() as RootReducer;
    const copyChess = boardUtils.clone(chess);

    // don't let the user place more than one king
    if (
      piece.type === FIGURES.KING &&
      !(chess.kings[piece.color] === EMPTY || chess.kings[piece.color] === sq)
    ) {
      return;
    }

    copyChess.board[sq] = { type: piece.type, color: piece.color };
    dispatch({ type: BoardActionTypes.BOARD_ITEM, board: copyChess.board });

    if (piece.type === FIGURES.KING) {
      copyChess.kings[piece.color] = sq;
      dispatch({ type: BoardActionTypes.BOARD_KINGS, kings: copyChess.kings });
    }

    const fen = boardUtils.generateFen(copyChess);
    dispatch({ type: BoardActionTypes.BOARD_FEN, fen: fen });

    /** TODO: Меняет header не понятно зачем? */
    // update_setup(fen);
  };
};

export default boardPutCellAction;