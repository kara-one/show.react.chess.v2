import React, { FC, useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { SQUARES } from '../types/boardTypes';
import { copySquares, getBoard } from '../utils/boardUtils';

const BoardComponent: FC = () => {
  const { board } = useTypedSelector((state) => state.chess);
  const { boardLoadAction } = useActions();
  const [currentBoard, setCurrentBoard] = useState(getBoard(board));
  console.log('currentBoard: ', currentBoard);

  useEffect(() => {
    boardLoadAction();
  }, []);

  useEffect(() => {
    setCurrentBoard(getBoard(board));
  }, [board]);

  // console.log('board: ', board);
  // const sq = copySquares();
  // const sqq = SQUARES;

  // console.log('sq: ', sq);
  // console.log('sqq: ', sqq);

  return <div>BoardComponent</div>;
};

export default BoardComponent;
