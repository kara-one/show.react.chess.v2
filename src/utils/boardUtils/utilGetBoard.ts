import { FIGURES } from '../../types/typesBoard/typesBoardFigures';
import {
  BoardCell,
  Checkmate,
  IBoardState,
  SQUARES,
} from '../../types/typesBoard/typesBoardState';

/**
 * Calculating the Display Board
 * @implements Chess.board()
 * @param {BoardItem[]} board = BoardItem[]
 * @returns {BoardCell[][]} BoardCell[][]
 */
const getBoard = (
  board: IBoardState['board'],
  selectSquare: IBoardState['selectSquare'],
  availables: IBoardState['availables'],
  checkmate: Checkmate
): BoardCell[][] => {
  const calculateBoard: BoardCell[][] = [];
  let row: BoardCell[] = [];
  let x = 0;
  let y = 0;
  let isCheck = false;
  let isCheckmate = false;

  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    const currentBoard = board[i];
    let available = false;
    for (let j = 0; j < availables.length; j++) {
      if (availables[j] && availables[j].to === i) {
        available = true;
      }
    }

    if (currentBoard && currentBoard.type === FIGURES.KING) {
        isCheck = checkmate.check[currentBoard.color];
        isCheckmate = checkmate.checkmate[currentBoard.color];
    }

    row.push({
      name: i,
      x,
      y,
      figure: currentBoard,
      selected: i === selectSquare,
      available: available,
      check: isCheck,
      checkmate: isCheckmate,
    });
    x++;

    if ((i + 1) & 0x88) {
      calculateBoard.push(row);
      row = [];
      i += 8;
      x = 0;
      y++;
    }
  }

  return calculateBoard;
};

export const utilGetBoard = {
  getBoard,
};
