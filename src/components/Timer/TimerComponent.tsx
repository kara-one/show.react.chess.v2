import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTimer } from '../../hooks/useTimer';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { COLORS } from '../../types/typesBoard/typesBoardFigures';
import './TimerComponent.scss';

const TimerComponent = (prop: { type: `${COLORS}` }) => {
  const { turn } = useTypedSelector((state) => state.chess);
  const { boardTimerAction } = useActions();

  const timer = useTimer(prop.type);

  useEffect(() => {
    if (prop.type !== turn) {
      boardTimerAction(timer.time, prop.type);
    }
  }, [turn]); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = ['timer'];
  classes.push(prop.type);
  classes.push(turn === prop.type ? 'active' : '');

  const className = classes.join(' ');

  return <div className={className}>{timer.string}</div>;
};

export default TimerComponent;
