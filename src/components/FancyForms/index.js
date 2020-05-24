import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  --text-color: ${(props) => (props.textColor ? props.textColor : '#afafaf')};
  --valid-color: ${(props) =>
    props.validColor ? props.validColor : '#067BC2'};
  --invalid-color: ${(props) =>
    props.invalidColor ? props.invalidColor : '#ff5e5b'};

  text-align: center;
  label {
    display: block;
  }
`;

const StyledField = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  border-bottom: 2px dashed var(--text-color);
  margin: 3rem auto 1rem;
  transition: 500ms;

  &::after {
    content: '';
    position: relative;
    display: block;
    height: 4px;
    width: 100%;
    background: ${(props) =>
      props.underlineColor ? props.underlineColor : '#067BC2'};
    transform: scaleX(0);
    transform-origin: 0%;
    opacity: 0;
    transition: all 500ms ease;
    top: 2px;
  }
  &:focus-within {
    border-color: transparent;
  }
  &:focus-within::after {
    transform: scaleX(1);
    opacity: 1;
  }
  &:focus-within label,
  input:not(:placeholder-shown) + label {
    transform: scale(0.8) translateY(-4rem);
    opacity: 1;
  }
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  overflow: hidden;
  margin: 0;
  width: 100%;
  padding: 0.25rem 0;
  background: none;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  transition: border 500ms;

  &:valid {
    color: var(--valid-color);
  }
  &:invalid {
    color: var(--invalid-color);
  }
`;
const StyledLabel = styled.label`
  color: var(--text-color);
  font-size: 1.2rem;
  z-index: -1;
  position: absolute;
  transform: translateY(-1.5rem);
  transform-origin: 0%;
  transition: transform 400ms;
`;

const Button = styled.button`
  touch-action: manipulation;
  color: #ebe9e9;
  background-color: #067bc2;
  border: none;
  padding: 15px 20px 15px 20px;
  /* width: 150px; */
  font-size: 1.3rem;
  font-weight: bold;
  transition: 0.3s all ease-out;
  border-radius: 2px 2px 2px 2px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  margin-bottom: 5px;
  transition: all 1000ms;

  &:hover {
    background-color: #2c95ce;
    text-decoration: none;
  }
  &:active {
    background-color: #0564a8;
  }
`;

const StyledEmailInput = ({ email, setEmail }) => (
  <StyledInput
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
    }}
    type="email"
    name="email"
    placeholder=" "
  />
);

const StyledPasswordInput = ({ password, setPassword }) => (
  <StyledInput
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
    }}
    type="password"
    name="password"
    placeholder=" "
  />
);

const StyledConfirmPasswordInput = ({
  confirmPassword,
  setConfirmPassword,
}) => (
  <StyledInput
    value={confirmPassword}
    onChange={(e) => {
      setConfirmPassword(e.target.value);
    }}
    type="password"
    name="confirm_password"
    placeholder=" "
  />
);

const StyledEmailLabel = () => <StyledLabel htmlFor="email">Email</StyledLabel>;

const StyledPasswordLabel = () => (
  <StyledLabel htmlFor="password">Password</StyledLabel>
);

const StyledConfirmPasswordLabel = () => (
  <StyledLabel htmlFor="confirm_password">Confirm Password</StyledLabel>
);

export const FancyLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) => (
  <StyledForm onSubmit={onSubmit}>
    <StyledField>
      <StyledEmailInput email={email} setEmail={setEmail} />
      <StyledEmailLabel />
    </StyledField>
    <StyledField>
      <StyledPasswordInput password={password} setPassword={setPassword} />
      <StyledPasswordLabel />
    </StyledField>
    <Button type="submit">Login</Button>
  </StyledForm>
);

export const FancySignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
}) => (
  <StyledForm onSubmit={onSubmit}>
    <StyledField>
      <StyledEmailInput email={email} setEmail={setEmail} />
      <StyledEmailLabel />
    </StyledField>
    <StyledField>
      <StyledPasswordInput password={password} setPassword={setPassword} />
      <StyledPasswordLabel />
    </StyledField>
    <StyledField>
      <StyledConfirmPasswordInput
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
      <StyledConfirmPasswordLabel />
    </StyledField>
    <Button type="submit">Sign Up</Button>
  </StyledForm>
);
