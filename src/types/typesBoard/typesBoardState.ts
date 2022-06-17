import { Fen } from './typesBoardFen';
import { COLORS, FIGURES, Kings } from './typesBoardFigures';
import { Comments, History, HistoryMove } from './typesBoardHistory';

export type POSSIBLE_RESULTS = '1-0' | '0-1' | '1/2-1/2' | '*';

export enum FLAGS {
  NORMAL = 'n',
  CAPTURE = 'c',
  BIG_PAWN = 'b',
  EP_CAPTURE = 'e',
  PROMOTION = 'p',
  KSIDE_CASTLE = 'k',
  QSIDE_CASTLE = 'q',
}

export enum BITS {
  NORMAL = 1, // 1 // Чистый ход
  CAPTURE = 2, // 10 // Взятие
  BIG_PAWN = 4, // 100 // Длинный ход пешки
  EP_CAPTURE = 8, // 1000 // Взятие на проходе
  PROMOTION = 16, // 10000
  KSIDE_CASTLE = 32, // 100000 // Рокировка
  QSIDE_CASTLE = 64, // 1000000 // Рокировка
}

export enum RANKS {
  RANK_1 = 7,
  RANK_2 = 6,
  RANK_3 = 5,
  RANK_4 = 4,
  RANK_5 = 3,
  RANK_6 = 2,
  RANK_7 = 1,
  RANK_8 = 0,
}

// prettier-ignore
export enum SQUARES {
  "a8" =   0, "b8" =   1, "c8" =   2, "d8" =   3, "e8" =   4, "f8" =   5, "g8" =   6, "h8" =   7,
  "a7" =  16, "b7" =  17, "c7" =  18, "d7" =  19, "e7" =  20, "f7" =  21, "g7" =  22, "h7" =  23,
  "a6" =  32, "b6" =  33, "c6" =  34, "d6" =  35, "e6" =  36, "f6" =  37, "g6" =  38, "h6" =  39,
  "a5" =  48, "b5" =  49, "c5" =  50, "d5" =  51, "e5" =  52, "f5" =  53, "g5" =  54, "h5" =  55,
  "a4" =  64, "b4" =  65, "c4" =  66, "d4" =  67, "e4" =  68, "f4" =  69, "g4" =  70, "h4" =  71,
  "a3" =  80, "b3" =  81, "c3" =  82, "d3" =  83, "e3" =  84, "f3" =  85, "g3" =  86, "h3" =  87,
  "a2" =  96, "b2" =  97, "c2" =  98, "d2" =  99, "e2" = 100, "f2" = 101, "g2" = 102, "h2" = 103,
  "a1" = 112, "b1" = 113, "c1" = 114, "d1" = 115, "e1" = 116, "f1" = 117, "g1" = 118, "h1" = 119
}

export interface BoardItem {
  type: `${FIGURES}`;
  color: `${COLORS}`;
}

export interface BoardCell {
  name: number;
  x: number;
  y: number;
  figure: BoardItem | null;
  selected: boolean;
  available: boolean;
  check: boolean;
  checkmate: boolean;
}

export interface Checkmate {
  check: {
    [COLORS.WHITE]: boolean;
    [COLORS.BLACK]: boolean;
  };
  checkmate: {
    [COLORS.WHITE]: boolean;
    [COLORS.BLACK]: boolean;
  };
}

export interface Timer {
  [COLORS.WHITE]: number;
  [COLORS.BLACK]: number;
}

export interface IBoardState {
  board: Array<BoardItem | null>;
  currentPlayer?: `${COLORS}`;
  selectSquare: number;
  availables: HistoryMove[] | [];
  fen: Fen;
  kings: Kings;
  turn: `${COLORS}`;
  castling: Kings;
  ep_square: number;
  half_moves: number;
  move_number: number;
  history: History[];
  timer: Timer;
  checkmate: Checkmate;
  header?: object;
  comments: Comments;
}

export interface PropsMove {
  board: IBoardState['board'];
  turn: IBoardState['turn'];
  kings: IBoardState['kings'];
  castling: IBoardState['castling'];
  ep_square: IBoardState['ep_square'];
  half_moves: IBoardState['half_moves'];
  move_number: IBoardState['move_number'];
}
