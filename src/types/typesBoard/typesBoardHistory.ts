import { Fen } from "./typesBoardFen";
import { COLORS, FIGURES, Kings } from "./typesBoardFigures";
import { BITS } from "./typesBoardState";

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
