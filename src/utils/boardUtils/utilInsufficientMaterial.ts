import { FIGURES } from '../../types/typesBoard/typesBoardFigures';
import { BoardItem, SQUARES } from '../../types/typesBoard/typesBoardState';

/** TODO: Сохраняем */
type Pieces<T extends FIGURES> = {
  [k in `${T}`]?: number;
};
const insufficientMaterial = (board: BoardItem[]): boolean => {
  const pieces: Pieces<FIGURES> = {};
  const bishops = [];
  let num_pieces = 0;
  let sq_color = 0;

  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    sq_color = (sq_color + 1) % 2;
    if (i & 0x88) {
      i += 7;
      continue;
    }

    const piece = board[i];
    if (piece) {
      pieces[piece.type] = 1 + piece.type in pieces ? pieces[piece.type] : 0;

      if (piece.type === FIGURES.BISHOP) {
        bishops.push(sq_color);
      }
      num_pieces++;
    }
  }

  /* k vs. k */
  if (num_pieces === 2) {
    return true;
  } else if (
    /* k vs. kn .... or .... k vs. kb */
    num_pieces === 3 &&
    (pieces[FIGURES.BISHOP] === 1 || pieces[FIGURES.KNIGHT] === 1)
  ) {
    return true;
  } else if (num_pieces - 2 === pieces[FIGURES.BISHOP]) {
    /* kb vs. kb where any number of bishops are all on the same color */
    let sum = 0;

    for (let i = 0; i < bishops.length; i++) {
      sum += bishops[i];
    }

    if (sum === 0 || sum === bishops.length) {
      return true;
    }
  }

  return false;
};

export const utilInsufficientMaterial = { insufficientMaterial };
