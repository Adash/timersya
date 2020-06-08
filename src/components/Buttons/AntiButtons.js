import styled from 'styled-components';

const AntiButton = styled.button`
  touch-action: manipulation;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  padding-left: 0;
  padding-right: 0;
`;

export const AntiButtonDelete = styled(AntiButton)`
  color: ${(props) => props.theme.antibutton_delete_color || '#ee6c4d'};
`;

export const AntiButtonEdit = styled(AntiButton)`
  color: ${(props) => props.theme.antibutton_edit_color || '#3da5d9'};
  margin-left: 25px;
`;

export const AntiButtonOK = styled(AntiButton)`
  color: ${(props) => props.theme.antibutton_ok_color || '#d2ba3f'};
`;

export default AntiButton;
