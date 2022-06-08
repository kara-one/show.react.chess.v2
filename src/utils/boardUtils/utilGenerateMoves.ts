import { FIGURES } from '../../types/typesBoard/typesBoardFigures';
import {
  BITS,
  IBoardState,
  PropsMove,
  RANKS,
  SQUARES,
} from '../../types/typesBoard/typesBoardState';
import { boardUtils } from '../boardUtils';
import { PAWN_OFFSETS, PIECE_OFFSETS } from '../../store/initialState';
import { HistoryMove } from '../../types/typesBoard/typesBoardHistory';

interface nextMovesChessData {
  board: IBoardState['board'];
  turn: IBoardState['turn'];
}

const nextMoves = (
  chessData: nextMovesChessData,
  from: SQUARES,
  to: SQUARES,
  flags: BITS,
): HistoryMove[] => {
  /** TODO: Собрать аргументы в массив и в вызове делать рест */
  // const buildMoveArgs = [];
  const returnMoves: HistoryMove[] = [];

  /* if pawn promotion */
  const boardFrom = chessData.board[from];
  if (
    boardFrom &&
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

/**
 * Calculate moves for one or more Figures
 * @param {PropsMove} chessData: PropsMove
 * @param {`${SQUARES}`} square?: `${SQUARES}`
 * @param {boolean} legal = true
 * @returns {HistoryMove[]} HistoryMove[]
 */
const generateMoves = (
  chessData: PropsMove,
  square?: number,
  legal: boolean = true,
): HistoryMove[] => {
  const copyChessData: PropsMove = boardUtils.clone(chessData);
  const nextMovesChessData: nextMovesChessData = {
    board: copyChessData.board,
    turn: copyChessData.turn,
  };
  const moves: HistoryMove[] = [];

  const them = boardUtils.swap_color(copyChessData.turn);
  const secondRank = { b: RANKS.RANK_7, w: RANKS.RANK_2 };

  const firstSq = square !== undefined ? square : SQUARES.a8;
  const lastSq = square !== undefined ? square : SQUARES.h1;
  const isSingleSquare = square !== undefined ? true : false;

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
    // console.log('i: ', i);
    // console.log('===boardI: ', boardI);
    if (
      boardI === null ||
      boardI === undefined ||
      boardI.color !== copyChessData.turn
    ) {
      continue;
    }

    if (boardI.type === FIGURES.PAWN) {
      /* single square, non-capturing */
      const squareSingle = i + PAWN_OFFSETS[copyChessData.turn][0];
      if (!copyChessData.board[squareSingle]) {
        moves.push(
          ...nextMoves(nextMovesChessData, i, squareSingle, BITS.NORMAL),
        );

        /* double square */
        const squareDouble = i + PAWN_OFFSETS[copyChessData.turn][1];
        if (
          secondRank[copyChessData.turn] === boardUtils.rank(i) &&
          !copyChessData.board[squareDouble]
        ) {
          moves.push(
            ...nextMoves(nextMovesChessData, i, squareDouble, BITS.BIG_PAWN),
          );
        }
      }

      /* pawn captures */
      for (let j = 2; j < 4; j++) {
        const squareCapture = i + PAWN_OFFSETS[copyChessData.turn][j];
        if (squareCapture & 0x88) continue;

        const boardSquare = copyChessData.board[squareCapture];

        if (boardSquare && boardSquare.color === them) {
          moves.push(
            ...nextMoves(nextMovesChessData, i, squareCapture, BITS.CAPTURE),
          );
        } else if (squareCapture === copyChessData.ep_square) {
          moves.push(
            ...nextMoves(
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
        let squareGeneral = i;

        while (true) {
          squareGeneral += offset;
          if (squareGeneral & 0x88) break;

          const boardSquare = copyChessData.board[squareGeneral];
          // console.log('===boardSquare: ', boardSquare);
          if (boardSquare === null || boardSquare === undefined) {
            /** Check is king attacked */
            if (
              boardI.type === 'k' &&
              boardUtils.attacked(
                copyChessData.board,
                boardUtils.swap_color(boardI.color),
                squareGeneral,
              )
            ) {
              break;
            }
            moves.push(
              ...nextMoves(nextMovesChessData, i, squareGeneral, BITS.NORMAL),
            );
          } else {
            if (boardSquare && boardSquare.color === copyChessData.turn) break;
            moves.push(
              ...nextMoves(nextMovesChessData, i, squareGeneral, BITS.CAPTURE),
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
        moves.push(
          ...nextMoves(
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
        moves.push(
          ...nextMoves(
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
  // console.log('legal_moves: ', legal_moves);

  return legal_moves;
};

export const utilGenerateMoves = { generateMoves };
