import { FIGURES } from '../../types/typesBoard/typesBoardFigures';
import { HistoryMove } from '../../types/typesBoard/typesBoardHistory';
import {
  BITS,
  IBoardState,
  SQUARES,
} from '../../types/typesBoard/typesBoardState';

interface PropsBuildMove {
  board: IBoardState['board'];
  turn: IBoardState['turn'];
}

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
  chessData: PropsBuildMove,
  from: SQUARES,
  to: SQUARES,
  flags: BITS,
  promotion?: `${FIGURES}`,
): HistoryMove | null => {
  const boardFrom = chessData.board[from];
  const boardTo = chessData.board[to];

  if (!boardFrom) return null;

  const move: HistoryMove = {
    color: chessData.turn,
    from: from,
    to: to,
    flags: flags,
    piece: boardFrom.type,
  };

  if (promotion) {
    move.flags = BITS.PROMOTION;
    move.promotion = promotion;
  }

  if (boardTo) {
    move.captured = boardTo.type;
  } else if (+flags & BITS.EP_CAPTURE) {
    move.captured = FIGURES.PAWN;
  }

  return move;
};

export const utilBuildMove = { buildMove };
