import React, { useCallback, useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { COLORS, FIGURES } from '../types/typesBoard/typesBoardFigures';
import { History } from '../types/typesBoard/typesBoardHistory';
import { SQUARES } from '../types/typesBoard/typesBoardState';
import './HistoryComponent.scss';
import TimersBlockComponent from './TimersBlockComponent';

interface HistoryList {
  [COLORS.WHITE]: string;
  [COLORS.BLACK]: string;
  id: number;
}

const HistoryComponent = () => {
  const { history } = useTypedSelector((state) => state.chess);
  const initHistoryList: HistoryList[] = [];
  const [historyList, setHistoryList] = useState(initHistoryList);

  const historyCalc = useCallback((history: History[]) => {
    const response: HistoryList[] = [];

    for (let i = 0; i < history.length; i++) {
      const historyMove = history[i].move;
      const id = i > 0 ? Math.floor(i / 2) : 0;

      if (i % 2 === 0) {
        response.push({
          [COLORS.WHITE]: '',
          [COLORS.BLACK]: '',
          id,
        });
      }

      let moveStr =
        historyMove.piece !== FIGURES.PAWN
          ? historyMove.piece.toUpperCase()
          : '';
      moveStr += SQUARES[historyMove.from];
      moveStr += historyMove.flags === 2 ? 'x' : '—';
      moveStr += SQUARES[historyMove.to];

      response[id][historyMove.color] = moveStr;
    }

    setHistoryList(response);
  }, []);

  useEffect(() => {
    historyCalc(history);
  }, [history]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="history">
      <TimersBlockComponent />
      <div className="history-list">
        <h3>History</h3>
        <ol>
          {historyList.map((row) => (
            <li key={row.id}>
              {row[COLORS.WHITE]} {row[COLORS.BLACK]}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HistoryComponent;
