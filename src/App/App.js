import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import 'styled-components/macro';
import styled from 'styled-components';
import { BaseWrapper } from '../components/Wrappers';
import { MainWrapper } from '../components/Wrappers';
import { Router } from '@reach/router';
import * as routes from '../constants/routes';
import { auth } from '../firebase/';

import Header from '../Header';
import { UnauthenticatedHome, AuthenticatedHome } from '../Home/';
import Timer from '../Timer/Timer';
import LoginPage from '../Login/LoginPage';
import SignUpPage from '../SignUp/SignUpPage';

const StyledRouter = styled(Router)`
  height: 100%;
  width: 100%;
`;

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

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(user);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);

  return (
    <BaseWrapper>
      {authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </BaseWrapper>
  );
}

export default App;
