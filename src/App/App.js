import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'styled-components/macro';
import { BaseWrapper } from '../components/Wrappers';
import { MainWrapper } from '../components/Wrappers';
import { Router } from '@reach/router';
import * as routes from '../constants/routes';

import Header from '../Header';
import Home from '../Home/Home';
import Timer from '../Timer/Timer';

function App() {
  return (
    <BaseWrapper>
      <Header />
      <MainWrapper>
        <Router
          css={`
            height: 100%;
            width: 100%;
          `}
        >
          <Home path={routes.home} />
          <Timer path={routes.timer} />
        </Router>
      </MainWrapper>
    </BaseWrapper>
  );
}

export default App;
