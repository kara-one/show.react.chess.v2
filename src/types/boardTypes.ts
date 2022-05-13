export enum COLORS {
  WHITE = 'w',
  BLACK = 'b',
}

export enum FIGURES {
  PAWN = 'p',
  KNIGHT = 'n',
  BISHOP = 'b',
  ROOK = 'r',
  QUEEN = 'q',
  KING = 'k',
}

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
  NORMAL = 1, // 1
  CAPTURE = 2, // 10
  BIG_PAWN = 4, // 100
  EP_CAPTURE = 8, // 1000
  PROMOTION = 16, // 10000
  KSIDE_CASTLE = 32, // 100000
  QSIDE_CASTLE = 64, // 1000000
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

export interface Kings {
  [COLORS.WHITE]: number;
  [COLORS.BLACK]: number;
}

export interface BoardItem {
  type: `${FIGURES}`;
  color: `${COLORS}`;
}

export interface Comments {
  [Name: Fen]: any;
}

export interface HistoryMove {
  color: `${COLORS}`;
  from: number;
  to: number;
  piece: `${FIGURES}`;
  flags: `${BITS}`;
  captured?: `${FIGURES}`;
  promotion?: `${FIGURES}`;
}

export interface History {
  move: HistoryMove;
  kings: Kings;
  turn: `${COLORS}`;
  castling: Kings;
  ep_square: number;
  half_moves: number;
  move_number: number;
}

export type SYMBOLS = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export type POSSIBLE_RESULTS = '1-0' | '0-1' | '1/2-1/2' | '*';

/** FEN */
export type Fen = string;

export interface ParsedFen {
  pieces: string;
  turn: `${COLORS}`;
  castling: Kings;
  ep_square: number;
  half_moves: number;
  move_number: number;
}

export interface ValidateFen {
  valid: boolean;
  error_number: number;
  error: string;
}

export interface ParseValidateFen {
  parsedFen: ParsedFen | null;
  error_number: number;
  error: string;
}

export interface IBoardState {
  board: BoardItem[];
  currentPlayer?: `${COLORS}`;
  fen: Fen;
  kings: Kings;
  turn: `${COLORS}`;
  castling: Kings;
  ep_square: number;
  half_moves: number;
  move_number: number;
  history: History[];
  header?: object;
  comments: Comments;
}

/** ACTIONS */
export enum BoardActionTypes {
  BOARD_ITEM = 'BOARD_ITEM',
  BOARD_PARSE_FEN = 'BOARD_PARSE_FEN',
  BOARD_FEN = 'BOARD_FEN',
  BOARD_KINGS = 'BOARD_KINGS',
  BOARD_TURN = 'BOARD_TURN',
  BOARD_CASTLING = 'BOARD_CASTLING',
  BOARD_EP_SQUARE = 'BOARD_EP_SQUARE',
  BOARD_HALF_MOVES = 'BOARD_HALF_MOVES',
  BOARD_MOVE_NUMBER = 'BOARD_MOVE_NUMBER',
  BOARD_HISTORY = 'BOARD_HISTORY',
  BOARD_HEADER = 'BOARD_HEADER',
  BOARD_COMMENTS = 'BOARD_COMMENTS',
}

interface BoardItemAction {
  type: BoardActionTypes.BOARD_ITEM;
  board: IBoardState['board'];
}
interface BoardFenAction {
  type: BoardActionTypes.BOARD_FEN;
  fen: IBoardState['fen'];
}
interface BoardKingsAction {
  type: BoardActionTypes.BOARD_KINGS;
  kings: IBoardState['kings'];
}
interface BoardTurnAction {
  type: BoardActionTypes.BOARD_TURN;
  turn: IBoardState['turn'];
}
interface BoardCastlingAction {
  type: BoardActionTypes.BOARD_CASTLING;
  castling: IBoardState['castling'];
}
interface BoardEpSquareAction {
  type: BoardActionTypes.BOARD_EP_SQUARE;
  epSquare: IBoardState['ep_square'];
}
interface BoardHalfMovesAction {
  type: BoardActionTypes.BOARD_HALF_MOVES;
  halfMoves: IBoardState['half_moves'];
}
interface BoardMoveNumberAction {
  type: BoardActionTypes.BOARD_MOVE_NUMBER;
  moveNumber: IBoardState['move_number'];
}
interface BoardHistoryAction {
  type: BoardActionTypes.BOARD_HISTORY;
  history: IBoardState['history'];
}
interface BoardHeaderAction {
  type: BoardActionTypes.BOARD_HEADER;
  header: IBoardState['header'];
}
interface BoardCommentsAction {
  type: BoardActionTypes.BOARD_COMMENTS;
  comments: IBoardState['comments'];
}

export type BoardActions =
  | BoardItemAction
  | BoardFenAction
  | BoardKingsAction
  | BoardTurnAction
  | BoardCastlingAction
  | BoardEpSquareAction
  | BoardHalfMovesAction
  | BoardMoveNumberAction
  | BoardHistoryAction
  | BoardHeaderAction
  | BoardCommentsAction;
