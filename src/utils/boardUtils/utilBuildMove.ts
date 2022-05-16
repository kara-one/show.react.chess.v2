import { COLORS, FIGURES } from '../../types/typesBoard/typesBoardFigures';
import { HistoryMove } from '../../types/typesBoard/typesBoardHistory';
import { BITS, BoardItem } from '../../types/typesBoard/typesBoardState';

/**
 *
 * @param {BoardItem[]} board
 * @param {number} from
 * @param {number} to
 * @param {`${BITS}`} flags
 * @param {FIGURES} promotion
 * @param {COLORS} turn
 * @returns {HistoryMove} {
    color: turn,
    from: from,
    to: to,
    flags: flags,
    piece: board[from].type,
  }
 */
const buildMove = (
  board: BoardItem[],
  from: number,
  to: number,
  flags: `${BITS}`,
  promotion: FIGURES,
  turn: COLORS,
): HistoryMove => {
  const move: HistoryMove = {
    color: turn,
    from: from,
    to: to,
    flags: flags,
    piece: board[from].type,
  };

  if (promotion) {
    move.flags = `${BITS.PROMOTION}`;
    move.promotion = promotion;
  }

  if (board[to]) {
    move.captured = board[to].type;
  } else if (+flags & BITS.EP_CAPTURE) {
    move.captured = FIGURES.PAWN;
  }

  return move;
};

export const utilBuildMove = { buildMove };
