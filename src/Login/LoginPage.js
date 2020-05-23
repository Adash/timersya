import React, { useState } from 'react';
import styled from 'styled-components';
import { signIn } from '../firebase/helpers';
import { Link, useNavigate } from '@reach/router';
import * as routes from '../constants/routes';
import { StyledError, H1 } from '../components/Elements';
import { FancyLoginForm } from '../components/FancyForms';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`email: ${email} - password : ${password}`);
    signIn(email, password)
      .then(() => {
        navigate(routes.home);
      })
      .catch((error) => setError(JSON.stringify(error.message)));
  };

  return (
    <LoginWrapper>
      <H1>Login</H1>
      {/* <StyledForm onSubmit={onSubmit}>
        <input
          id="email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">email</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <FormButton type="submit">Login</FormButton>
      </StyledForm> */}
      <FancyLoginForm
        email={email}
        setEmail={setEmail}
        passoword={password}
        setPassword={setPassword}
        onSubmit={onSubmit}
      />
      <Link to={routes.signup}>Sign up</Link>
      {error && <StyledError>{error}</StyledError>}
    </LoginWrapper>
  );
};

export default LoginPage;
