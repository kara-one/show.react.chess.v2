import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import Auth from './components/Auth';
import Home from './components/Home';
import { auth } from './firebase';

function App() {
  const user = auth.currentUser;
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

  console.log('user: ', user);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
