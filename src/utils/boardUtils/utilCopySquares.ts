import { SQUARES } from '../../types/typesBoard/typesBoardState';
import { boardUtils } from '.';

const copySquares = () => {
  /* from the ECMA-262 spec (section 12.6.4):
   * "The mechanics of enumerating the properties ... is
   * implementation dependent"
   * so: for (const sq in SQUARES) { keys.push(sq); } might not be
   * ordered correctly
   */
  const keys = [];
  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    if (i & 0x88) {
      i += 7;
      continue;
    }
    keys.push(boardUtils.algebraic(i));
  }
  return keys;
};

export const utilCopySquares = { copySquares };
