import React, { useState } from 'react';
import styled from 'styled-components';
import { signUp } from '../firebase/helpers';
import { useNavigate } from '@reach/router';
import * as routes from '../constants/routes';
import { FormButton } from '../components/Buttons';
import { StyledError, H1 } from '../components/Elements';

const StyledForm = styled.form`
  color: #4b4f5d;
  margin-top: 15px;
  height: 280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SignUpWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(false);
    console.log(
      `email: ${email} - password : ${password}- password2 : ${confirmPassword}`
    );
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    signUp(email, password)
      .then(() => {
        navigate(routes.home);
      })
      .catch((error) => setError(JSON.stringify(error.message)));
  };

  return (
    <SignUpWrapper>
      <H1>Sign up</H1>
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
        <input
          id="password2"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="password2">re-enter password</label>
        <FormButton type="submit">Sign up</FormButton>
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </SignUpWrapper>
  );
};

export default SignUpPage;
