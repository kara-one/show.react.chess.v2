import { BoardCell, ColorClasses, FigureClasses } from '../../types/boardTypes';

const figureType: FigureClasses = {
  p: 'pawn',
  n: 'knight',
  b: 'bishop',
  r: 'rook',
  q: 'queen',
  k: 'king',
};

const figureColor: ColorClasses = {
  b: 'black',
  w: 'white',
};

export const getCellClasses = (cell: BoardCell): string => {
  const cellClasses = ['cell'];

  cellClasses.push(`x${cell.x.toString()}`);
  cellClasses.push(`y${cell.y.toString()}`);

  if ((cell.x + cell.y) % 2 === 0) {
    cellClasses.push('dark');
  } else {
    cellClasses.push('light');
  }

  if (cell.figure) {
    cellClasses.push(figureColor[cell.figure.color]);
    cellClasses.push(figureType[cell.figure.type]);
  }

  if (cell.selected) {
    cellClasses.push('highlight');
  }

  if (cell.available) {
    cellClasses.push('hint');
  }

  return cellClasses.join(' ');
};
