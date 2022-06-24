import { Dispatch } from 'react';
import { BoardActions } from '../../../types/typesBoard/typesBoardActions';
import { COLORS } from '../../../types/typesBoard/typesBoardFigures';
import { BoardCell } from '../../../types/typesBoard/typesBoardState';
import { RootReducer } from '../../reducers';
import boardMakeMoveAction from './boardMakeMoveAction';
import boardMovesAction from './boardMovesAction';
import boardSetSelectedAction from './boardSetSelectedAction';

const cellClickAction = (curentCell: BoardCell): Function => {
  return (
    dispatch: Dispatch<BoardActions | Function>,
    getState: Function,
  ): void => {
    const { chess } = getState() as RootReducer;
    const checkmate = chess.checkmate.checkmate;

    if (checkmate[COLORS.WHITE] === false && checkmate[COLORS.BLACK] === false) {
      dispatch(boardSetSelectedAction(curentCell.name));
      dispatch(boardMovesAction(curentCell.name));
      dispatch(boardMakeMoveAction(curentCell.name));
    }
  };
};

export default cellClickAction;
