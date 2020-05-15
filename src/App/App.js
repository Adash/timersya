import React from 'react';

// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BaseWrapper } from '../components/Wrappers';

import Header from '../Header';
import Timer from '../Timer/Timer';

function App() {
  return (
    <BaseWrapper>
      <Header />
      <Timer />
    </BaseWrapper>
  );
}

export default App;
