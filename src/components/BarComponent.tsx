import React from 'react';
import './BarComponent.scss';
import HistoryComponent from './HistoryComponent';
import MenuComponent from './MenuComponent';

const BarComponent = () => {
  return (
    <div>
      <MenuComponent />
      <HistoryComponent />
    </div>
  );
};

export default BarComponent;
