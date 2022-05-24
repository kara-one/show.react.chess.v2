import {
  BoardCell,
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
): BoardCell[][] => {
  const calculateBoard: BoardCell[][] = [];
  let row: BoardCell[] = [];
  let x = 0;
  let y = 0;

  for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
    let available = false;
    for (let j = 0; j < availables.length; j++) {
      if (availables[j] && availables[j].to === i) {
        available = true;
      }
    }

    row.push({
      name: i,
      x,
      y,
      figure: board[i],
      selected: i === selectSquare,
      available: available,
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
