import React from 'react';
import BoardComponent from './BoardComponent';
import HistoryComponent from './HistoryComponent';
import './Home.scss';

const Home = () => {
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

export default Home;
