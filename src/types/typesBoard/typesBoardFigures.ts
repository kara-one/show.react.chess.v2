export enum COLORS {
  WHITE = 'w',
  BLACK = 'b',
}

export type ColorClasses = {
  [K in COLORS]: string;
};

export enum FIGURES {
  PAWN = 'p',
  KNIGHT = 'n',
  BISHOP = 'b',
  ROOK = 'r',
  QUEEN = 'q',
  KING = 'k',
}

export type FigureClasses = {
  [K in FIGURES]: string;
};

export interface Kings {
  [COLORS.WHITE]: number;
  [COLORS.BLACK]: number;
}

export type SYMBOLS = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
