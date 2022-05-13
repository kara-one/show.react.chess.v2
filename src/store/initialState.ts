import {
  BITS,
  COLORS,
  FIGURES,
  IBoardState,
  SQUARES,
} from '../types/boardTypes';

export const IS_DEVELOP = false;

export const labelChars: Array<string> = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
];
export const labelNums: Array<string> = [
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1',
];

export const FEN_ERRORS = {
  0: 'No errors.',
  1: 'FEN string must contain six space-delimited fields.',
  2: '6th field (move number) must be a positive integer.',
  3: '5th field (half move counter) must be a non-negative integer.',
  4: '4th field (en-passant square) is invalid.',
  5: '3rd field (castling availability) is invalid.',
  6: '2nd field (side to move) is invalid.',
  7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
  8: '1st field (piece positions) is invalid [consecutive numbers].',
  9: '1st field (piece positions) is invalid [invalid piece].',
  10: '1st field (piece positions) is invalid [row too large].',
  11: 'Illegal en-passant square',
};

export const EMPTY = -1;

export const DEFAULT_POSITION =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const PAWN_OFFSETS = {
  [COLORS.WHITE]: [-16, -32, -17, -15],
  [COLORS.BLACK]: [16, 32, 17, 15],
};

export const PIECE_OFFSETS = {
  [FIGURES.KNIGHT]: [-18, -33, -31, -14, 18, 33, 31, 14],
  [FIGURES.BISHOP]: [-17, -15, 17, 15],
  [FIGURES.ROOK]: [-16, 1, 16, -1],
  [FIGURES.QUEEN]: [-17, -16, -15, 1, 17, 16, 15, -1],
  [FIGURES.KING]: [-17, -16, -15, 1, 17, 16, 15, -1],
};

// prettier-ignore
export const ATTACKS = [
   20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
    0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
    0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
    0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
   24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
    0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
    0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
    0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
    0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
   20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
];

// prettier-ignore
export const RAYS = [
    17, 0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
    0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
    0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
    0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
    0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
    1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
    0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
    0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
    0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
    0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
    0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
  -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
];

export const SHIFTS = {
  [FIGURES.PAWN]: 0,
  [FIGURES.KNIGHT]: 1,
  [FIGURES.BISHOP]: 2,
  [FIGURES.ROOK]: 3,
  [FIGURES.QUEEN]: 4,
  [FIGURES.KING]: 5,
};

export const ROOKS = {
  [COLORS.WHITE]: [
    { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
    { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE },
  ],
  [COLORS.BLACK]: [
    { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
    { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE },
  ],
};

export const initialState: IBoardState = {
  board: new Array(128),
  currentPlayer: COLORS.WHITE,
  fen: '',
  kings: { w: EMPTY, b: EMPTY },
  turn: COLORS.WHITE,
  castling: { w: 0, b: 0 },
  ep_square: EMPTY,
  half_moves: 0,
  move_number: 1,
  history: [],
  header: {},
  comments: {},
};
