import { boardUtils } from '.';
import {
  ATTACKS,
  CHECKMATE,
  PIECE_OFFSETS,
  RAYS,
  SHIFTS,
} from '../../store/initialBoardState';
import {
  COLORS,
  FIGURES,
  Kings,
} from '../../types/typesBoard/typesBoardFigures';
import { History } from '../../types/typesBoard/typesBoardHistory';
import {
  Checkmate,
  IBoardState,
  PropsMove,
  SQUARES,
} from '../../types/typesBoard/typesBoardState';

/** TODO: Оставляем */
const attacked = (
  board: IBoardState['board'],
  color: `${COLORS}`,
  square: number,
): boolean => {
  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    // did we run off the end of the board
    if (i & 0x88) {
      i += 7;
      continue;
    }
    // if empty square or wrong color
    const boardI = board[i];
    if (boardI === null || boardI === undefined || boardI.color !== color)
      continue;

    const difference = i - square;
    const index = difference + 119;
    if (ATTACKS[index] & (1 << SHIFTS[boardI.type])) {
      if (boardI.type === FIGURES.PAWN) {
        if (difference > 0) {
          if (boardI.color === COLORS.WHITE) return true;
        } else {
          if (boardI.color === COLORS.BLACK) return true;
        }
        continue;
      }

      // if the piece is a knight or a king
      if (boardI.type === 'n') return true;
      if (boardI.type === 'k') {
        const isProtected = attacked(
          board,
          boardUtils.swap_color(color),
          square,
        );
        return !isProtected;
      }

      const offset = RAYS[index];
      let j = i + offset;

      let blocked = false;
      while (j !== square) {
        if (board[j] !== null && board[j] !== undefined) {
          blocked = true;
          break;
        }
        j += offset;
      }

      if (!blocked) return true;
    }
  }

  return false;
};

const king_attacked = (
  board: IBoardState['board'],
  color: `${COLORS}`,
  kings: Kings,
) => {
  return attacked(board, boardUtils.swap_color(color), kings[color]);
};

const in_check = (
  board: IBoardState['board'],
  turn: `${COLORS}`,
  kings: Kings,
) => {
  return king_attacked(board, turn, kings);
};

const in_checkmate = (chessData: PropsMove) => {
  return (
    in_check(chessData.board, chessData.turn, chessData.kings) &&
    boardUtils.generateMoves(chessData).length === 0
  );
};

/** Check for checkmate after each turn for two kings at once */
const isCheckmate = (board: IBoardState['board'], lastHistory: History): Checkmate => {
  const chessData: PropsMove = {
    board: board,
    castling: lastHistory.castling,
    ep_square: lastHistory.ep_square,
    half_moves: lastHistory.half_moves,
    kings: lastHistory.kings,
    move_number: lastHistory.move_number,
    turn: lastHistory.turn
  };

  const copyChessData: PropsMove = boardUtils.clone(chessData);
  const chm = CHECKMATE;

  const white = COLORS.WHITE;
  const black = COLORS.BLACK;
  const wKing = copyChessData.kings[white];
  const bKing = copyChessData.kings[black];

  const bCheck = attacked(copyChessData.board, white, bKing);
  const wCheck = attacked(copyChessData.board, black, wKing);

  chm.check[white] = wCheck;
  chm.check[black] = bCheck;

  if (bCheck || wCheck) {
    const chmTurn = bCheck ? black : white;
    const chmKing = bCheck ? bKing : wKing;
    const lastMove = lastHistory.move;

    // King’s moves
    const kingMoveAvailables = boardUtils.generateMoves(copyChessData, chmKing);

    // If the king has moves
    if (kingMoveAvailables.length > 0) {
      for (const i of kingMoveAvailables) {
        // если поле пустое то точно не мат
        if (i.flags === 1) return chm;

        // check that the figure is not protected
        const isProtected = attacked(
          copyChessData.board,
          lastMove.color,
          lastMove.to,
        );
        if (!isProtected) return chm;
      }
    }

    // a threatening figure under attack?
    const isCaptured = attacked(copyChessData.board, chmTurn, lastMove.to);
    if (isCaptured) return chm;

    // Are we looking for the trajectory of the impact and can we close the king?
    // if it’s a knight then it’s checkmate
    if (lastMove.piece === 'n') {
      chm.checkmate[chmTurn] = true;
      return chm;
    }

    // trajectory
    let moves = [];
    if (lastMove.piece !== FIGURES.PAWN) {
      for (let j = 0; j < PIECE_OFFSETS[lastMove.piece].length; j++) {
        const offset = PIECE_OFFSETS[lastMove.piece][j];
        let squareGeneral = lastMove.to;

        while (true) {
          squareGeneral += offset;
          if (squareGeneral & 0x88) break;

          const boardSquare = chessData.board[squareGeneral];
          if (
            boardSquare === null ||
            boardSquare === undefined ||
            squareGeneral === chmKing
          ) {
            moves.push(squareGeneral);
          }
        }

        if (!moves.includes(chmKing)) moves = [];
        else break;
      }
    }

    const guardMoves = boardUtils.generateMoves(copyChessData);
    for (const move of guardMoves) {
      if (moves.includes(move.to)) return chm;
    }

    // CHECKMATE
    chm.checkmate[chmTurn] = true;
    return chm;
  }

  return chm;
};

const in_stalemate = (chessData: PropsMove) => {
  return (
    !in_check(chessData.board, chessData.turn, chessData.kings) &&
    boardUtils.generateMoves(chessData).length === 0
  );
};

export const utilAttacked = {
  attacked,
  king_attacked,
  in_check,
  in_checkmate,
  in_stalemate,
  isCheckmate,
};