import './CellComponent.scss';
import React, { FC } from 'react';
import { useActions } from '../hooks/useActions';
import { BoardCell } from '../types/boardTypes';
import { getCellClasses } from '../utils/boardUtils/getCellClasses';

interface CellProps {
  curentCell: BoardCell;
}

const CellComponent: FC<CellProps> = ({ curentCell }) => {
  const { cellClickAction } = useActions();

  function cellClick() {
    cellClickAction(curentCell);
  }

  return <div className={getCellClasses(curentCell)} onClick={cellClick}></div>;
};

export default CellComponent;
