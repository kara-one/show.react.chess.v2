import { boardUtils } from '.';
import { ATTACKS, RAYS, SHIFTS } from '../../store/initialState';
import {
  COLORS,
  FIGURES,
  Kings,
} from '../../types/typesBoard/typesBoardFigures';
import { IBoardState, SQUARES } from '../../types/typesBoard/typesBoardState';
import { PropsGenerateMoves } from './utilGenerateMoves';

/** TODO: Оставляем */
const attacked = (
  board: IBoardState['board'],
  color: `${COLORS}`,
  square: number,
): boolean => {
  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    // did we run off the end of the board
    if (i & 0x88) {
      i += 7;
      continue;
    }

    // if empty square or wrong color
    const boardI = board[i];
    if (boardI === null || boardI.color !== color) continue;

    const difference = i - square;
    const index = difference + 119;

    if (ATTACKS[index] & (1 << SHIFTS[boardI.type])) {
      if (boardI.type === FIGURES.PAWN) {
        if (difference > 0) {
          if (boardI.color === COLORS.WHITE) return true;
        } else {
          if (boardI.color === COLORS.BLACK) return true;
        }
        continue;
      }

      // if the piece is a knight or a king
      if (boardI.type === 'n' || boardI.type === 'k') return true;

      const offset = RAYS[index];
      let j = i + offset;

      let blocked = false;
      while (j !== square) {
        if (board[j] !== null) {
          blocked = true;
          break;
        }
        j += offset;
      }

      if (!blocked) return true;
    }
  }

  return false;
};

const king_attacked = (
  board: IBoardState['board'],
  color: `${COLORS}`,
  kings: Kings,
) => {
  return attacked(board, boardUtils.swap_color(color), kings[color]);
};

const in_check = (
  board: IBoardState['board'],
  turn: `${COLORS}`,
  kings: Kings,
) => {
  return king_attacked(board, turn, kings);
};

const in_checkmate = (chessData: PropsGenerateMoves) => {
  return (
    in_check(chessData.board, chessData.turn, chessData.kings) &&
    boardUtils.generateMoves(chessData).length === 0
  );
};

const in_stalemate = (chessData: PropsGenerateMoves) => {
  return (
    !in_check(chessData.board, chessData.turn, chessData.kings) &&
    boardUtils.generateMoves(chessData).length === 0
  );
};

export const utilAttacked = {
  attacked,
  king_attacked,
  in_check,
  in_checkmate,
  in_stalemate,
};
