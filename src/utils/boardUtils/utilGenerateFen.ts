import { EMPTY } from '../../store/initialState';
import { COLORS } from '../../types/typesBoard/typesBoardFigures';
import {
  BITS,
  IBoardState,
  SQUARES,
} from '../../types/typesBoard/typesBoardState';
import { boardUtils } from '.';

/**
 * Creates a Fen as a State
 * @param {IBoardState} state
 * @returns {string} fen
 */
const generateFen = (state: IBoardState): string => {
  let empty = 0;
  let fen = '';

  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    if (state.board[i] === null) {
      empty++;
      continue;
    }

    if (empty > 0) {
      fen += empty;
      empty = 0;
    }

    const color = state.board[i].color;
    const piece = state.board[i].type;

    fen += color === COLORS.WHITE ? piece.toUpperCase() : piece.toLowerCase();

    if ((i + 1) & 0x88) {
      if (empty > 0) {
        fen += empty;
      }

      if (i !== SQUARES.h1) {
        fen += '/';
      }

      empty = 0;
      i += 8;
    }
  }

  let cflags = '';
  if (state.castling[COLORS.WHITE] & BITS.KSIDE_CASTLE) {
    cflags += 'K';
  }
  if (state.castling[COLORS.WHITE] & BITS.QSIDE_CASTLE) {
    cflags += 'Q';
  }
  if (state.castling[COLORS.BLACK] & BITS.KSIDE_CASTLE) {
    cflags += 'k';
  }
  if (state.castling[COLORS.BLACK] & BITS.QSIDE_CASTLE) {
    cflags += 'q';
  }

  /* do we have an empty castling flag? */
  cflags = cflags || '-';
  const epflags =
    state.ep_square === EMPTY ? '-' : boardUtils.algebraic(state.ep_square);

  return [
    fen,
    state.turn,
    cflags,
    epflags,
    state.half_moves,
    state.move_number,
  ].join(' ');
};

export const utilGenerateFen = { generateFen };
