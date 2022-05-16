import { ATTACKS, RAYS, SHIFTS } from '../../store/initialState';
import { COLORS, FIGURES } from '../../types/typesBoard/typesBoardFigures';
import { BoardItem, SQUARES } from '../../types/typesBoard/typesBoardState';

/** TODO: Оставляем */
const attacked = (
  board: BoardItem[],
  color: COLORS,
  square: number,
): boolean => {
  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    // did we run off the end of the board
    if (i & 0x88) {
      i += 7;
      continue;
    }

    // if empty square or wrong color
    if (board[i] === null || board[i].color !== color) continue;

    const piece = board[i];
    const difference = i - square;
    const index = difference + 119;

    if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
      if (piece.type === FIGURES.PAWN) {
        if (difference > 0) {
          if (piece.color === COLORS.WHITE) return true;
        } else {
          if (piece.color === COLORS.BLACK) return true;
        }
        continue;
      }

      // if the piece is a knight or a king
      if (piece.type === 'n' || piece.type === 'k') return true;

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

export const utilAttacked = { attacked };
