import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import styled from 'styled-components';
import { Button } from '../components/Buttons';
import { FirebaseContext } from '../firebase/context';

const HomeWrapper = styled.div`
  margin: auto;
  width: 304px;
  max-height: 273px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
`;

const ButtonLink = styled(Link)`
  color: ${(props) => props.theme.home_btn_color || '#ebe9e9'};
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
  flex: 0 0 auto;

  &:hover {
    background-color: ${(props) => props.theme.btn_hover_color || '#2c95ce'};
    color: #0056b3;
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
      <ButtonLink to={routes.timer}>Online Timer</ButtonLink>
      <ButtonLink to={routes.add}>Add Tasks</ButtonLink>
      <ButtonLink to={routes.offlineTimer}>Offline Timer</ButtonLink>
      <Button onClick={signOut}>Sign out</Button>
    </HomeWrapper>
  );
};

export { UnauthenticatedHome, AuthenticatedHome };
