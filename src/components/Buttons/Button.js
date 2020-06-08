import styled from 'styled-components';

const Button = styled.button`
  touch-action: manipulation;
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

export default Button;
