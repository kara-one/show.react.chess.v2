import { useCallback, useEffect, useState } from 'react';
import { COLORS } from '../types/typesBoard/typesBoardFigures';
import { useTypedSelector } from './useTypedSelector';

interface ResponseTimer {
  time: number;
  string: string;
}

export const useTimer = (color: `${COLORS}`): ResponseTimer => {
  const { timer, turn, checkmate } = useTypedSelector((state) => state.chess);
  const [currentTimer, setCurrentTimer] = useState(timer[color]);
  const [currentInterval, setCurrentInterval] = useState(0);

  const runTimer = useCallback(
    (
      currentTimer: number,
      setCurrentTimer: Function,
      setCurrentInterval: Function,
    ) => {
      const interval = setInterval(() => {
        setCurrentTimer(++currentTimer);
      }, 1000);

      setCurrentInterval(+interval);
    },
    [],
  );

  const stopTimer = useCallback((interval: number) => {
    clearInterval(interval);
  }, []);

  useEffect(() => {
    stopTimer(currentInterval);

    if (turn === color && !checkmate.checkmate[turn]) {
      runTimer(currentTimer, setCurrentTimer, setCurrentInterval);
    }
  }, [turn]); // eslint-disable-line react-hooks/exhaustive-deps

  const timerToString = (countDown: number): string => {
    const hours = Math.floor((countDown % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((countDown % (60 * 60)) / 60);
    const seconds = Math.floor(countDown % 60);

    return (
      `${hours >= 10 ? hours : '0' + hours}` +
      `:${minutes >= 10 ? minutes : '0' + minutes}` +
      `:${seconds >= 10 ? seconds : '0' + seconds}`
    );
  };

  return { time: currentTimer, string: timerToString(currentTimer) };
};
