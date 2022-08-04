import React from 'react';
import BoardComponent from './Board/BoardComponent';
import HistoryComponent from './HistoryComponent';
import './HomeComponent.scss';

const HomeComponent = () => {
  return (
    <div className="home">
      <div className="board-wrap">
        <BoardComponent />
      </div>
      <div className="history-wrap">
        <HistoryComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
