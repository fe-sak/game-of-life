import React, { FC } from 'react';
import Viewport from './components/Viewport';
import Home from './pages/Home';

const App: FC = () => {
  return (
    <Viewport>
      <Home />
    </Viewport>
  );
};

export default App;
