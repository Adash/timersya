import styled from 'styled-components';

const FormButton = styled.button`
  color: #ebe9e9;
  background-color: #067bc2;
  border: none;
  padding: 10px 10px 10px 10px;
  width: 95px;
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

export default FormButton;
