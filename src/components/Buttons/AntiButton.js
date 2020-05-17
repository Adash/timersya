import styled from 'styled-components';

const AntiButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

export const AntiButtonDelete = styled(AntiButton)`
  color: #ee6c4d;
`;

export default AntiButton;
