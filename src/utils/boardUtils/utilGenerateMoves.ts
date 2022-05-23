import { FIGURES } from '../../types/typesBoard/typesBoardFigures';
import {
  BITS,
  IBoardState,
  RANKS,
  SQUARES,
} from '../../types/typesBoard/typesBoardState';
import { boardUtils } from '../boardUtils';
import { PAWN_OFFSETS, PIECE_OFFSETS } from '../../store/initialState';
import { HistoryMove } from '../../types/typesBoard/typesBoardHistory';
import { PropsMakeMove } from './utilMakeMove';

interface nextMovesChessData {
  board: IBoardState['board'];
  turn: IBoardState['turn'];
}

const nextMoves = (
  chessData: nextMovesChessData,
  to: SQUARES,
  from: SQUARES,
  flags: BITS,
): HistoryMove[] => {
  /** TODO: Собрать аргументы в массив и в вызове делать рест */
  // const buildMoveArgs = [];
  const returnMoves: HistoryMove[] = [];

  /* if pawn promotion */
  const boardFrom = chessData.board[from];
  if (
    boardFrom !== null &&
    boardFrom.type === FIGURES.PAWN &&
    (boardUtils.rank(to) === RANKS.RANK_8 ||
      boardUtils.rank(to) === RANKS.RANK_1)
  ) {
    const pieces = [
      FIGURES.QUEEN,
      FIGURES.ROOK,
      FIGURES.BISHOP,
      FIGURES.KNIGHT,
    ];
    for (let i = 0; i < pieces.length; i++) {
      const buildMove = boardUtils.buildMove(
        chessData,
        from,
        to,
        flags,
        pieces[i],
      );
      if (buildMove !== null) {
        returnMoves.push(buildMove);
      }
    }
  } else {
    const buildMove = boardUtils.buildMove(chessData, from, to, flags);
    if (buildMove !== null) {
      returnMoves.push(buildMove);
    }
  }

  return returnMoves;
};

export interface PropsGenerateMoves {
  board: IBoardState['board'];
  turn: IBoardState['turn'];
  kings: IBoardState['kings'];
  castling: IBoardState['castling'];
  ep_square: IBoardState['ep_square'];
  half_moves: IBoardState['half_moves'];
  move_number: IBoardState['move_number'];
}

/**
 * Calculate moves for one or more Figures
 * @param {PropsGenerateMoves} chessData: PropsGenerateMoves
 * @param {`${SQUARES}`} cellName?: `${SQUARES}`
 * @param {boolean} legal = true
 * @returns {HistoryMove[]} HistoryMove[]
 */
const generateMoves = (
  chessData: PropsGenerateMoves,
  cellName?: `${SQUARES}`,
  legal: boolean = true,
): HistoryMove[] => {
  const copyChessData: PropsMakeMove = boardUtils.clone(chessData);
  const nextMovesChessData: nextMovesChessData = {
    board: copyChessData.board,
    turn: copyChessData.turn,
  };
  const moves: HistoryMove[] = [];

  const them = boardUtils.swap_color(copyChessData.turn);
  const secondRank = { b: RANKS.RANK_7, w: RANKS.RANK_2 };

  const firstSq = cellName ? parseInt(SQUARES[cellName]) : SQUARES.a8;
  const lastSq = cellName ? parseInt(SQUARES[cellName]) : SQUARES.h1;
  const isSingleSquare = cellName ? true : false;

  /* do we want legal moves?
  const legal =
    typeof options !== 'undefined' && 'legal' in options ? options.legal : true; */

  /* are we generating moves for a single square?
  if (typeof options !== 'undefined' && 'square' in options) {
    if (options.square in SQUARES) {
      firstSq = lastSq = SQUARES[options.square];
      isSingleSquare = true;
    } else {
      // invalid square
      return [];
    }
  } */

  for (let i = firstSq; i <= lastSq; i++) {
    /* did we run off the end of the board */
    if (i & 0x88) {
      i += 7;
      continue;
    }

    const boardI = copyChessData.board[i];
    if (boardI === null || boardI.color !== copyChessData.turn) {
      continue;
    }

    if (boardI.type === FIGURES.PAWN) {
      /* single square, non-capturing */
      const squareSingle = i + PAWN_OFFSETS[copyChessData.turn][0];
      if (copyChessData.board[squareSingle] === null) {
        moves.concat(
          nextMoves(nextMovesChessData, i, squareSingle, BITS.NORMAL),
        );

        /* double square */
        const squareDouble = i + PAWN_OFFSETS[copyChessData.turn][1];
        if (
          secondRank[copyChessData.turn] === boardUtils.rank(i) &&
          copyChessData.board[squareDouble] === null
        ) {
          moves.concat(
            nextMoves(nextMovesChessData, i, squareDouble, BITS.BIG_PAWN),
          );
        }
      }

      /* pawn captures */
      for (let j = 2; j < 4; j++) {
        const squareCapture = i + PAWN_OFFSETS[copyChessData.turn][j];
        if (squareCapture & 0x88) continue;

        const boardSquare = copyChessData.board[squareCapture];

        if (boardSquare !== null && boardSquare.color === them) {
          moves.concat(
            nextMoves(nextMovesChessData, i, squareCapture, BITS.CAPTURE),
          );
        } else if (squareCapture === copyChessData.ep_square) {
          moves.concat(
            nextMoves(
              nextMovesChessData,
              i,
              copyChessData.ep_square,
              BITS.EP_CAPTURE,
            ),
          );
        }
      }
    } else {
      for (let j = 0; j < PIECE_OFFSETS[boardI.type].length; j++) {
        const offset = PIECE_OFFSETS[boardI.type][j];
        let square = i;

        while (true) {
          square += offset;
          if (square & 0x88) break;

          const boardSquare = copyChessData.board[square];
          if (boardSquare === null) {
            moves.concat(nextMoves(nextMovesChessData, i, square, BITS.NORMAL));
          } else {
            if (boardSquare.color === copyChessData.turn) break;
            moves.concat(
              nextMoves(nextMovesChessData, i, square, BITS.CAPTURE),
            );
            break;
          }

          /* break, if knight or king */
          if (boardI.type === 'n' || boardI.type === 'k') break;
        }
      }
    }
  }

  /* check for castling if: a) we're generating all moves, or b) we're doing
   * single square move generation on the king's square
   */
  if (!isSingleSquare || lastSq === copyChessData.kings[copyChessData.turn]) {
    /* king-side castling */
    if (copyChessData.castling[copyChessData.turn] & BITS.KSIDE_CASTLE) {
      const castling_from = copyChessData.kings[copyChessData.turn];
      const castling_to = castling_from + 2;

      if (
        copyChessData.board[castling_from + 1] === null &&
        copyChessData.board[castling_to] === null &&
        !boardUtils.attacked(
          copyChessData.board,
          them,
          copyChessData.kings[copyChessData.turn],
        ) &&
        !boardUtils.attacked(copyChessData.board, them, castling_from + 1) &&
        !boardUtils.attacked(copyChessData.board, them, castling_to)
      ) {
        moves.concat(
          nextMoves(
            nextMovesChessData,
            copyChessData.kings[copyChessData.turn],
            castling_to,
            BITS.KSIDE_CASTLE,
          ),
        );
      }
    }

    /* queen-side castling */
    if (copyChessData.castling[copyChessData.turn] & BITS.QSIDE_CASTLE) {
      const castling_from = copyChessData.kings[copyChessData.turn];
      const castling_to = castling_from - 2;

      if (
        copyChessData.board[castling_from - 1] === null &&
        copyChessData.board[castling_from - 2] === null &&
        copyChessData.board[castling_from - 3] === null &&
        !boardUtils.attacked(
          copyChessData.board,
          them,
          copyChessData.kings[copyChessData.turn],
        ) &&
        !boardUtils.attacked(copyChessData.board, them, castling_from - 1) &&
        !boardUtils.attacked(copyChessData.board, them, castling_to)
      ) {
        moves.concat(
          nextMoves(
            nextMovesChessData,
            copyChessData.kings[copyChessData.turn],
            castling_to,
            BITS.QSIDE_CASTLE,
          ),
        );
      }
    }
  }

  /* return all pseudo-legal moves (this includes moves that allow the king
   * to be captured)
   */
  if (!legal) {
    return moves;
  }

  /* filter out illegal moves */
  const legal_moves: HistoryMove[] = [];
  for (let i = 0; i < moves.length; i++) {
    const fakeChessData = boardUtils.makeMove(moves[i], {
      board: copyChessData.board,
      castling: copyChessData.castling,
      ep_square: copyChessData.ep_square,
      half_moves: copyChessData.half_moves,
      kings: copyChessData.kings,
      move_number: copyChessData.move_number,
      turn: copyChessData.turn,
    });

    if (
      !boardUtils.king_attacked(
        fakeChessData.board,
        fakeChessData.turn,
        fakeChessData.kings,
      )
    ) {
      legal_moves.push(moves[i]);
    }
  }

  return legal_moves;
};

export const utilGenerateMoves = { generateMoves };
