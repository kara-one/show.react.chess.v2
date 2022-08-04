import React from 'react';
import { userSignOut } from '../firebase';
import './MenuComponent.scss';

const MenuComponent = () => {
  const handlerLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    userSignOut();
  };

  return (
    <div className="menu">
      <button className="logout" onClick={handlerLogout}></button>
    </div>
  );
};

export default MenuComponent;
