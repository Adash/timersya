import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FirebaseContext } from '../firebase/context';
import { Link, useNavigate } from 'react-router-dom';
import * as routes from '../constants/routes';
import { StyledError, H1Gray } from '../components/Elements';
import { FancyLoginForm } from '../components/FancyForms';
import DualRing from '../components/Spinners/DualRing';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  const Firebase = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loginInitiated, setLoginInitiated] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoginInitiated(true);
    Firebase.signIn(email, password)
      .then(() => {
        navigate(routes.home);
      })
      .catch((error) => setError(JSON.stringify(error.message)));
  };

  return (
    <LoginWrapper>
      {loginInitiated ? (
        <>
          <H1Gray>Loging in...</H1Gray>
          <DualRing />
        </>
      ) : (
        <>
          <H1Gray>Login</H1Gray>
          <FancyLoginForm
            email={email}
            setEmail={setEmail}
            passoword={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
          />
          <Link to={routes.signup}>Sign up</Link>
          {error && <StyledError>{error}</StyledError>}
        </>
      )}
    </LoginWrapper>
  );
};

export default LoginPage;
