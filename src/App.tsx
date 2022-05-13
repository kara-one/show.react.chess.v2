import React from 'react';
import './App.scss';
import BoardComponent from './components/BoardComponent';

function App() {
  return (
    <div className="App">
      <div className="board-wrap">
        <BoardComponent />
      </div>
      <div className="history-wrap">
      </div>
    </div>
  );
}

export default App;
