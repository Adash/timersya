import React from 'react';
import Navbar from '../NavbarDropdown/Navbar';
import { UnauthenticatedHome } from '../Home/';
import LoginPage from '../Login/LoginPage';
import SignUpPage from '../SignUp/SignUpPage';
import { StyledRouter } from '../components/Wrappers';
import { MainWrapper } from '../components/Wrappers';
import * as routes from '../constants/routes';
import { Route } from 'react-router-dom';

const UnauthenticatedApp = () => (
  <>
    <Navbar />
    <MainWrapper>
      <StyledRouter>
        <Route element={<UnauthenticatedHome />} path={routes.home} />
        <Route element={<LoginPage />} path={routes.login} />
        <Route element={<SignUpPage />} path={routes.signup} />
      </StyledRouter>
    </MainWrapper>
  </>
);

export default UnauthenticatedApp;
