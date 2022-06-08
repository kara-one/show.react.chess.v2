import { boardUtils } from '.';
import { EMPTY, ROOKS } from '../../store/initialState';
import { COLORS, FIGURES } from '../../types/typesBoard/typesBoardFigures';
import { HistoryMove } from '../../types/typesBoard/typesBoardHistory';
import { BITS, PropsMove } from '../../types/typesBoard/typesBoardState';

const makeMove = (move: HistoryMove, chessData: PropsMove): PropsMove => {
  const copyChessData: PropsMove = boardUtils.clone(chessData);
  const turn = chessData.turn;
  const them = boardUtils.swap_color(turn);

  /** TODO: Добавляет элемент в history, выносим в отдельный action и вызываем его в boardMakeMoveAction  */
  //push(move);

  copyChessData.board[move.to] = copyChessData.board[move.from];
  copyChessData.board[move.from] = null;

  /* if ep capture, remove the captured pawn */
  if (move.flags & BITS.EP_CAPTURE) {
    if (turn === COLORS.BLACK) {
      copyChessData.board[move.to - 16] = null;
    } else {
      copyChessData.board[move.to + 16] = null;
    }
  }

  /* if pawn promotion, replace with new piece */
  if (move.flags & BITS.PROMOTION && move.promotion) {
    copyChessData.board[move.to] = { type: move.promotion, color: turn };
  }

  /* if we moved the king */
  const boardCellMoveTo = copyChessData.board[move.to];
  if (boardCellMoveTo !== null && boardCellMoveTo.type === FIGURES.KING) {
    copyChessData.kings[boardCellMoveTo.color] = move.to;

    /* if we castled, move the rook next to the king */
    if (move.flags & BITS.KSIDE_CASTLE) {
      const castling_to = move.to - 1;
      const castling_from = move.to + 1;
      copyChessData.board[castling_to] = copyChessData.board[castling_from];
      copyChessData.board[castling_from] = null;
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      const castling_to = move.to + 1;
      const castling_from = move.to - 2;
      copyChessData.board[castling_to] = copyChessData.board[castling_from];
      copyChessData.board[castling_from] = null;
    }

    /* turn off castling */
    copyChessData.castling[turn] = 0;
  }

  /* turn off castling if we move a rook */
  if (copyChessData.castling[turn]) {
    for (let i = 0, len = ROOKS[turn].length; i < len; i++) {
      if (
        move.from === ROOKS[turn][i].square &&
        copyChessData.castling[turn] & ROOKS[turn][i].flag
      ) {
        copyChessData.castling[turn] ^= ROOKS[turn][i].flag;
        break;
      }
    }
  }

  /* turn off castling if we capture a rook */
  if (copyChessData.castling[them]) {
    for (let i = 0, len = ROOKS[them].length; i < len; i++) {
      if (
        move.to === ROOKS[them][i].square &&
        copyChessData.castling[them] & ROOKS[them][i].flag
      ) {
        copyChessData.castling[them] ^= ROOKS[them][i].flag;
        break;
      }
    }
  }

  /* if big pawn move, update the en passant square */
  if (move.flags & BITS.BIG_PAWN) {
    if (turn === 'b') {
      copyChessData.ep_square = move.to - 16;
    } else {
      copyChessData.ep_square = move.to + 16;
    }
  } else {
    copyChessData.ep_square = EMPTY;
  }

  /* reset the 50 move counter if a pawn is moved or a piece is captured */
  if (move.piece === FIGURES.PAWN) {
    copyChessData.half_moves = 0;
  } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
    copyChessData.half_moves = 0;
  } else {
    copyChessData.half_moves++;
  }

  if (turn === COLORS.BLACK) {
    copyChessData.move_number++;
  }

  copyChessData.turn = boardUtils.swap_color(turn);

  return copyChessData;
};

export const utilMakeMove = {
  makeMove,
};