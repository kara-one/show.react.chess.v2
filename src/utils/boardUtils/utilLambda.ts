import { COLORS } from '../../types/typesBoard/typesBoardFigures';
import { SQUARES } from '../../types/typesBoard/typesBoardState';

const rank = (i: number): number => i >> 4;

const file = (i: number): number => i & 15;

const swap_color = (c: COLORS): COLORS =>
  c === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;

const isDigit = (c: string): boolean => '0123456789'.indexOf(c) !== -1;

export const trim = (str: string): string => str.replace(/^\s+|\s+$/g, '');

/** TODO: Оставляем */
// parses all of the decorators out of a SAN string
export const strippedSan = (move: string): string =>
  move.replace(/=/, '').replace(/[+#]?[?!]*$/, '');

const algebraic = (i: number): keyof typeof SQUARES => {
  const f = file(i);
  const r = rank(i);
  const square =
    'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);

  return square as keyof typeof SQUARES;
};

export const utilLambda = {
  rank,
  file,
  swap_color,
  isDigit,
  algebraic,
  strippedSan,
  trim,
};
