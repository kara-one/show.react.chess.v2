import { Dispatch } from 'react';
import { BoardActions } from '../../../types/typesBoard/typesBoardActions';
import { BoardCell } from '../../../types/typesBoard/typesBoardState';
import boardMovesAction from './boardMovesAction';
import boardSetSelectedAction from './boardSetSelectedAction';

const cellClickAction = (curentCell: BoardCell): Function => {
  return (
    dispatch: Dispatch<BoardActions | Function>,
    getState: Function,
  ): void => {
    // console.log('curentCell: ', curentCell);
    dispatch(boardSetSelectedAction(curentCell.name));
    dispatch(boardMovesAction(curentCell.name));
  };
};

export default cellClickAction;
