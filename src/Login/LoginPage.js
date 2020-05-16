import React, { useState } from 'react';
import styled from 'styled-components';
import { signIn } from '../firebase/helpers';
import { useNavigate } from '@reach/router';
import * as routes from '../constants/routes';

const LoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledError = styled.p`
  color: red;
  font-weight: bold;
`;

const StyledForm = styled.form`
  margin-top: 15px;
  height: 30%;
  width: 100%;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const FormButton = styled.button`
  color: #ebe9e9;
  background-color: #067bc2;
  border: none;
  padding: 10px 10px 10px 10px;
  width: 80px;
  font-size: 1.3rem;
  font-weight: bold;
  transition: 0.3s all ease-out;
  border-radius: 2px 2px 2px 2px;
  text-decoration: none;
  cursor: pointer;
  /* margin-top: 10px; */

  &:hover {
    background-color: #2c95ce;
    text-decoration: none;
  }
  &:active {
    background-color: #0564a8;
  }
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
      <h1>Login</h1>
      <StyledForm onSubmit={onSubmit}>
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
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </LoginWrapper>
  );
};

export default LoginPage;
