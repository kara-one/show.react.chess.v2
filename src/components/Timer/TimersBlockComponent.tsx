import React from 'react';
import { COLORS } from '../../types/typesBoard/typesBoardFigures';
import TimerComponent from './TimerComponent';
import './TimersBlockComponent.scss';

const TimersBlockComponent = () => {
  return (
    <div className="timer-wrap">
      <TimerComponent type={COLORS.WHITE} />
      <TimerComponent type={COLORS.BLACK} />
    </div>
  );
};

export default TimersBlockComponent;
