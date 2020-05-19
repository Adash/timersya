import React from 'react';
import { StyledRouter } from '../components/Wrappers';
import Header from '../Header';
import { AuthenticatedHome } from '../Home/';
import Timer from '../Timer/Timer';
import { MainWrapper } from '../components/Wrappers';
import * as routes from '../constants/routes';
import 'styled-components/macro';

const AuthenticatedApp = () => (
  <>
    <Header />
    <MainWrapper>
      <StyledRouter>
        <AuthenticatedHome path={routes.home} />
        <Timer path={routes.timer} />
      </StyledRouter>
    </MainWrapper>
  </>
);

export default AuthenticatedApp;
