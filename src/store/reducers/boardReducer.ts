
import { BoardActions, BoardActionTypes } from '../../types/typesBoard/typesBoardActions';
import { IBoardState } from '../../types/typesBoard/typesBoardState';
import { initialState } from '../initialState';

export const boardReducer = (
  state = initialState,
  action: BoardActions,
): IBoardState => {
  switch (action.type) {
    case BoardActionTypes.BOARD_ITEM:
      return { ...state, board: action.board };
    case BoardActionTypes.BOARD_FEN:
      return { ...state, fen: action.fen };
    case BoardActionTypes.BOARD_KINGS:
      return { ...state, kings: action.kings };
    case BoardActionTypes.BOARD_TURN:
      return { ...state, turn: action.turn };
    case BoardActionTypes.BOARD_CASTLING:
      return { ...state, castling: action.castling };
    case BoardActionTypes.BOARD_EP_SQUARE:
      return { ...state, ep_square: action.epSquare };
    case BoardActionTypes.BOARD_HALF_MOVES:
      return { ...state, half_moves: action.halfMoves };
    case BoardActionTypes.BOARD_MOVE_NUMBER:
      return { ...state, move_number: action.moveNumber };
    case BoardActionTypes.BOARD_HISTORY:
      return { ...state, history: action.history };
    case BoardActionTypes.BOARD_HEADER:
      return { ...state, header: action.header };
    case BoardActionTypes.BOARD_COMMENTS:
      return { ...state, comments: action.comments };
    default:
      return state;
  }
};
