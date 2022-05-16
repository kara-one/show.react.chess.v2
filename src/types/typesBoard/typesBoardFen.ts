import { COLORS, Kings } from "./typesBoardFigures";

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
