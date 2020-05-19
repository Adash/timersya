import React from 'react';
import Header from '../Header';
import { UnauthenticatedHome } from '../Home/';
import LoginPage from '../Login/LoginPage';
import SignUpPage from '../SignUp/SignUpPage';
import { StyledRouter } from '../components/Wrappers';
import { MainWrapper } from '../components/Wrappers';
import * as routes from '../constants/routes';

const UnauthenticatedApp = () => (
  <>
    <Header />
    <MainWrapper>
      <StyledRouter>
        <UnauthenticatedHome path={routes.home} />
        <LoginPage path={routes.login} />
        <SignUpPage path={routes.signup} />
      </StyledRouter>
    </MainWrapper>
  </>
);

export default UnauthenticatedApp;
