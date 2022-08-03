import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import Auth from './components/Auth';
import Home from './components/Home';
import { useAuth } from './hooks/useAuth';

function App() {
  const userAuth = useAuth();
  const user = userAuth.user;
  const navigate = useNavigate();
  console.log('userAuth: ', userAuth);

  useEffect(() => {
    if (user) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [user, navigate]);

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
