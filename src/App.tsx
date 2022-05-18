import React, { FC } from 'react';
import TooltipProvider from './contexts/TooltipContext';
import Home from './pages/Home';

const App: FC = () => {
  return (
    <TooltipProvider>
      <Home />
    </TooltipProvider>
  );
};

export default App;
