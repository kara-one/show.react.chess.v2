import React, { FC, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import HomeComponent from './HomeComponent';
import './MainComponent.scss';

interface MainProps {
  isSignedIn: boolean;
}

const MainComponent: FC<MainProps> = (props: MainProps) => {
  const { isSignedIn } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  }, [isSignedIn, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/auth" element={<AuthComponent />} />
      </Routes>
    </div>
  );
};

export default MainComponent