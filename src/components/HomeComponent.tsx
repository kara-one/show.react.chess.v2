import React from 'react';
import BarComponent from './BarComponent';
import BoardComponent from './Board/BoardComponent';
import './HomeComponent.scss';

const HomeComponent = () => {
  return (
    <div className="home">
      <div className="board-wrap">
        <BoardComponent />
      </div>
      <div className="history-wrap">
        <BarComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
