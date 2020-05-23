import React, { useState } from 'react';
import styled from 'styled-components';
import { signUp } from '../firebase/helpers';
import { useNavigate } from '@reach/router';
import * as routes from '../constants/routes';
import { StyledError, H1 } from '../components/Elements';
import { FancySignUpForm } from '../components/FancyForms';

const SignUpWrapper = styled.div`
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
      <FancySignUpForm
        email={email}
        setEmail={setEmail}
        passoword={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmit={onSubmit}
      />
      {error && <StyledError>{error}</StyledError>}
    </SignUpWrapper>
  );
};

export default SignUpPage;
