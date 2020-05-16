import React from 'react';
import { Link } from '@reach/router';
import * as routes from '../constants/routes';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import { auth } from '../services/firebase';

const HomeWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonLink = styled(Link)`
  color: #ebe9e9;
  background-color: #067bc2;
  border: none;
  padding: 30px 30px 30px 30px;
  width: 130px;
  font-size: 1.5rem;
  font-weight: bold;
  transition: 0.3s all ease-out;
  border-radius: 2px 2px 2px 2px;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    background-color: #2c95ce;
    text-decoration: none;
  }
  &:active {
    background-color: #0564a8;
  }
`;

const UnauthenticatedHome = () => {
  return (
    <HomeWrapper>
      <ButtonLink to={routes.login}>Login</ButtonLink>
    </HomeWrapper>
  );
};

const AuthenticatedHome = () => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('signed out');
      })
      .catch((error) => {
        console.log(`something wrong happened. I think ${error}`);
      });
  };
  return (
    <HomeWrapper>
      <ButtonLink to={routes.timer}>Timer</ButtonLink>
      <Button onClick={signOut}>Sign out</Button>
    </HomeWrapper>
  );
};

export { UnauthenticatedHome, AuthenticatedHome };
