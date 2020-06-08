import React, { useContext } from 'react';
import { Link } from '@reach/router';
import * as routes from '../constants/routes';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import { FirebaseContext } from '../firebase/context';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonLink = styled(Link)`
  color: ${(props) => props.theme.text_color || '#ebe9e9'};
  background-color: ${(props) => props.theme.base_color || '#067bc2'};
  border: none;
  padding: 30px 30px 30px 30px;
  width: 150px;
  font-size: 1.5rem;
  font-weight: bold;
  transition: 0.3s all ease-out;
  border-radius: 2px 2px 2px 2px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    background-color: ${(props) => props.theme.btn_hover_color || '#2c95ce'};
    text-decoration: none;
  }
  &:active {
    background-color: ${(props) => props.theme.btn_active_color || '#0564a8'};
  }
`;

const UnauthenticatedHome = () => {
  return (
    <HomeWrapper>
      <ButtonLink to={routes.login}>Login</ButtonLink>
      <ButtonLink to={routes.signup}>Sign up</ButtonLink>
    </HomeWrapper>
  );
};

const AuthenticatedHome = () => {
  const { signOut } = useContext(FirebaseContext);

  return (
    <HomeWrapper>
      <ButtonLink to={routes.timer}>Timer</ButtonLink>
      <Button onClick={signOut}>Sign out</Button>
    </HomeWrapper>
  );
};

export { UnauthenticatedHome, AuthenticatedHome };
