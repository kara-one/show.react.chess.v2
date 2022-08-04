import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoadingComponent from './components/LoadingComponent';
import MainComponent from './components/MainComponent';
import './App.scss';

function App() {
  const { pending, isSignedIn } = useAuth();
  let screen;

  if (pending) {
    screen = <LoadingComponent />;
  } else {
    screen = <MainComponent isSignedIn={isSignedIn} />;
  }

  return <div className="App">{screen}</div>;
}

export default App;
