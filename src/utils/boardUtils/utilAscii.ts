import { COLORS } from '../../types/typesBoard/typesBoardFigures';
import { BoardItem, SQUARES } from '../../types/typesBoard/typesBoardState';
import { boardUtils } from '.';

/** TODO: Оставляем */
const ascii = (board: BoardItem[]) => {
  let s = '   +------------------------+\n';
  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    /* display the rank */
    if (boardUtils.file(i) === 0) {
      s += ' ' + '87654321'[boardUtils.rank(i)] + ' |';
    }

    /* empty piece */
    if (board[i] === null) {
      s += ' . ';
    } else {
      const piece = board[i].type;
      const color = board[i].color;
      const symbol =
        color === COLORS.WHITE ? piece.toUpperCase() : piece.toLowerCase();
      s += ' ' + symbol + ' ';
    }

    if ((i + 1) & 0x88) {
      s += '|\n';
      i += 8;
    }
  }
  s += '   +------------------------+\n';
  s += '     a  b  c  d  e  f  g  h\n';

  return s;
};

export const utilAscii = { ascii };
