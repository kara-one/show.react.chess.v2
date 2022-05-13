import { Dispatch } from 'react';
import {
  BoardActions,
  BoardActionTypes,
  BoardCell,
  BoardItem,
  COLORS,
  FIGURES,
  IBoardState,
  ParsedFen,
  ParseValidateFen,
  SQUARES,
} from '../../types/boardTypes';
import {
  algebraic,
  clone,
  generate_fen,
  is_digit,
  parseValidateFen,
} from '../../utils/boardUtils';
import { DEFAULT_POSITION, EMPTY, IS_DEVELOP } from '../initialState';
import { RootReducer } from '../reducers';

/**
 * TODO: Проверить: не вносятся изменеия в history и comments?
 * TODO: Поставить проверку на fen === chess.fen
 *
 * Making changes to chess state from fen,
 * keep_headers = true clear chess.header
 * @implements Chess.load()
 * @param {IBoardState['fen']} fen = DEFAULT_POSITION,
 * @param {boolean} keep_headers = false,
 * @returns {Function}
 */
const boardLoadAction = (
  fen: IBoardState['fen'] = DEFAULT_POSITION,
  keep_headers: boolean = false,
): Function => {
  return (
    dispatch: Dispatch<BoardActions | Function>,
    getState: Function,
  ): void => {
    // Get State
    const { chess } = getState() as RootReducer;

    // Checking what props fen is new
    if (fen === chess.fen) {
      return;
    }

    // Validate fen
    const isDevelop = IS_DEVELOP;
    const checkFen: ParseValidateFen | ParseValidateFen['parsedFen'] =
      parseValidateFen(fen, isDevelop);

    if (
      (!isDevelop && checkFen === null) ||
      (isDevelop &&
        checkFen &&
        'parsedFen' in checkFen &&
        checkFen.parsedFen === null)
    ) {
      return;
    }

    const copyChess = clone(chess);
    const parsedFen: ParsedFen =
      isDevelop && checkFen && 'parsedFen' in checkFen
        ? (checkFen.parsedFen as ParsedFen)
        : (checkFen as ParsedFen);

    // Changing state fields from parsedFen
    dispatch({
      type: BoardActionTypes.BOARD_TURN,
      turn: parsedFen.turn,
    });

    dispatch({
      type: BoardActionTypes.BOARD_EP_SQUARE,
      epSquare: parsedFen.ep_square,
    });

    dispatch({
      type: BoardActionTypes.BOARD_HALF_MOVES,
      halfMoves: parsedFen.half_moves,
    });

    dispatch({
      type: BoardActionTypes.BOARD_MOVE_NUMBER,
      moveNumber: parsedFen.move_number,
    });

    dispatch({
      type: BoardActionTypes.BOARD_CASTLING,
      castling: parsedFen.castling,
    });

    dispatch({
      type: BoardActionTypes.BOARD_HEADER,
      header: !keep_headers ? chess.header : {},
    });

    const fenPiecesRegexp = new RegExp('[/]', 'g');
    const fenPieces = parsedFen.pieces.replace(fenPiecesRegexp, '8');
    let squareBit = 0;
    for (let i = 0; i < fenPieces.length; i++) {
      const char = fenPieces.charAt(i);

      if (is_digit(char)) {
        squareBit += parseInt(char, 10);
        continue;
      }

      const color = char < 'a' ? COLORS.WHITE : COLORS.BLACK;
      const piece = {
        type: char.toLowerCase() as `${FIGURES}`,
        color: color,
      };
      const square = algebraic(squareBit);
      const sq = SQUARES[square];

      if (
        piece.type === FIGURES.KING &&
        !(chess.kings[piece.color] === EMPTY || chess.kings[piece.color] === sq)
      ) {
        continue;
      }

      copyChess.board[sq] = piece;

      if (piece.type === FIGURES.KING) {
        copyChess.kings[piece.color] = sq;

        dispatch({
          type: BoardActionTypes.BOARD_KINGS,
          kings: copyChess.kings,
        });
      }

      squareBit++;
    }

    dispatch({ type: BoardActionTypes.BOARD_ITEM, board: copyChess.board });

    dispatch({ type: BoardActionTypes.BOARD_FEN, fen: fen });

    /** TODO: update_setup вносит изменения в header, не понятно зачем? */
    //update_setup(generate_fen(copyChess));
  };
};

/**
 * Insert changes into one board cell
 * @Implementation Chess.put()
 * @param {BoardItem} piece
 * @param {keyof typeof SQUARES} square
 * @returns {Function}
 */
const boardPutCellAction = (
  piece: BoardItem,
  square: keyof typeof SQUARES,
): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {
    const sq = SQUARES[square];
    const { chess } = getState() as RootReducer;
    const copyChess = clone(chess);

    // don't let the user place more than one king
    if (
      piece.type === FIGURES.KING &&
      !(chess.kings[piece.color] === EMPTY || chess.kings[piece.color] === sq)
    ) {
      return;
    }

    copyChess.board[sq] = { type: piece.type, color: piece.color };
    dispatch({ type: BoardActionTypes.BOARD_ITEM, board: copyChess.board });

    if (piece.type === FIGURES.KING) {
      copyChess.kings[piece.color] = sq;
      dispatch({ type: BoardActionTypes.BOARD_KINGS, kings: copyChess.kings });
    }

    const fen = generate_fen(copyChess);
    dispatch({ type: BoardActionTypes.BOARD_FEN, fen: fen });

    /** TODO: Меняет header не понятно зачем? */
    // update_setup(fen);
  };
};

const cellClickAction = (cell: BoardCell): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {};
};

export const boardActions = {
  boardLoadAction,
  boardPutCellAction,
  cellClickAction,
};
