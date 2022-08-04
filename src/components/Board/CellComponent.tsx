import './CellComponent.scss';
import React, { FC } from 'react';
import { useActions } from '../../hooks/useActions';
import { boardUtils } from '../../utils/boardUtils';
import { BoardCell } from '../../types/typesBoard/typesBoardState';

interface CellProps {
  curentCell: BoardCell;
}

const CellComponent: FC<CellProps> = ({ curentCell }) => {
  const { cellClickAction } = useActions();

  function cellClick() {
    cellClickAction(curentCell);
  }

  return (
    <div
      className={boardUtils.getCellClasses(curentCell)}
      onClick={cellClick}
    ></div>
  );
};

export default CellComponent;
