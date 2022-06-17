import React from 'react';
import './App.scss';
import BoardComponent from './components/BoardComponent';
import HistoryComponent from './components/HistoryComponent';

function App() {
  return (
    <div className="App">
      <div className="board-wrap">
        <BoardComponent />
      </div>
      <div className="history-wrap">
        <HistoryComponent />
      </div>
    </div>
  );
}

export default App;
