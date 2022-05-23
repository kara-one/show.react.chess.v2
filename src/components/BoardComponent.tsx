import './BoardComponent.scss';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { boardUtils } from '../utils/boardUtils';
import { labelChars, labelNums } from '../store/initialState';
import CellComponent from './CellComponent';

const BoardComponent: FC = () => {
  const { board, selectSquare } = useTypedSelector((state) => state.chess);
  const { boardLoadAction } = useActions();
  const [currentBoard, setCurrentBoard] = useState(
    boardUtils.getBoard(board, selectSquare),
  );
  const [boardSide, setBoardSide] = useState(0);

  /** BOARD INIT */
  const boardInit = useCallback(() => {
    boardLoadAction();
  }, [boardLoadAction]);

  useEffect(() => {
    boardInit();
  }, [boardInit]);

  /** BOARD CREATE */
  useEffect(() => {
    setCurrentBoard(boardUtils.getBoard(board, selectSquare));
  }, [board, selectSquare]);

  /** BOARD RESIZE */
  let resizeWindow = useCallback((elem: Element | null) => {
    if (!elem) return;

    setBoardSide(
      Math.round(
        (elem.clientWidth > elem.clientHeight
          ? elem.clientHeight
          : elem.clientWidth) * 0.8,
      ),
    );
  }, []);

  useEffect(() => {
    const boardWrap = document.querySelector('.board-wrap');

    resizeWindow(boardWrap);
    window.addEventListener('resize', () => resizeWindow(boardWrap));

    return () =>
      window.removeEventListener('resize', () => resizeWindow(boardWrap));
  }, [resizeWindow]);

  const horLabels = (
    <div className="hor-label">
      {labelChars.map((char) => (
        <div key={char}>{char}</div>
      ))}
    </div>
  );

  const vertLabels = (
    <div className="vert-label">
      {labelNums.map((char) => (
        <div key={char}>{char}</div>
      ))}
    </div>
  );

  return (
    <div>
      <div
        className="board"
        style={{ width: `${boardSide}px`, height: `${boardSide}px` }}
      >
        <div></div>
        {horLabels}
        <div></div>
        {vertLabels}
        <div className="cell-area">
          {currentBoard.map((cellsRow) =>
            cellsRow.map((cell) => (
              <CellComponent key={cell.name} curentCell={cell} />
            )),
          )}
        </div>
        {vertLabels}
        <div></div>
        {horLabels}
        <div></div>
      </div>
    </div>
  );
};

export default BoardComponent;
