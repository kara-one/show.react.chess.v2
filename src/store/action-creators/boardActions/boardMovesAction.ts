import { Dispatch } from 'react';
import {
  BoardActions,
  BoardActionTypes,
} from '../../../types/typesBoard/typesBoardActions';
import { HistoryMove } from '../../../types/typesBoard/typesBoardHistory';
import { boardUtils } from '../../../utils/boardUtils';
import { PropsGenerateMoves } from '../../../utils/boardUtils/utilGenerateMoves';
import { RootReducer } from '../../reducers';

/**
 * The internal representation of a chess move is in 0x88 format, and
 * not meant to be human-readable.  The code below converts the 0x88
 * square coordinates to algebraic coordinates.  It also prunes an
 * unnecessary move keys resulting from a verbose call.
 * @returns void
 */
const boardMovesAction = (square?: number, verbose?: boolean): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {
    const { chess } = getState() as RootReducer;
    const copyChess = boardUtils.clone(chess);

    if (
      square &&
      copyChess.board[square] !== null &&
      copyChess.board[square]?.color === copyChess.turn
    ) {
      const chessData: PropsGenerateMoves = {
        board: copyChess.board,
        castling: copyChess.castling,
        ep_square: copyChess.ep_square,
        half_moves: copyChess.half_moves,
        kings: copyChess.kings,
        move_number: copyChess.move_number,
        turn: copyChess.turn,
      };
      const availables: HistoryMove[] = boardUtils.generateMoves(
        chessData,
        square,
        false,
      );
      console.log('moves: ', availables);
      dispatch({
        type: BoardActionTypes.BOARD_AVAILABLES,
        availables: availables,
      });
    }
    /**
     var ugly_moves = generate_moves(options)
      var moves = []

      for (var i = 0, len = ugly_moves.length; i < len; i++) {
        // does the user want a full move object (most likely not), or just SAN
        if (
          typeof options !== 'undefined' &&
          'verbose' in options &&
          options.verbose
        ) {
          moves.push(make_pretty(ugly_moves[i]))
        } else {
          moves.push(move_to_san(ugly_moves[i], false))
        }
      }

      return moves
     */
  };
};

export default boardMovesAction;
