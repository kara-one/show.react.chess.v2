import { Dispatch } from 'react';
import { BoardActions } from '../../../types/typesBoard/typesBoardActions';
import { BoardCell } from '../../../types/typesBoard/typesBoardState';

const cellClickAction = (cell: BoardCell): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {};
};

export default cellClickAction;
