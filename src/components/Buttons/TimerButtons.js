import styled from 'styled-components';

const TimerButton = styled.button`
  touch-action: manipulation;
  background-color: ${(props) => props.theme.btn_timer_color || '#6a8eae'};
  color: ${(props) => props.theme.btn_timer_text_color || '#ebe9e9'};
  border: none;
  padding: 20px 20px 20px 20px;
  font-size: 1.5rem;
  font-weight: bold;
  transition: 0.3s all ease-out;
  cursor: pointer;
`;

const TimerButtonReset = styled(TimerButton)`
  background-color: ${(props) => props.theme.btn_reset_color || '#ff6700'};
  color: ${(props) => props.theme.btn_reset_color_text};
  border-radius: 18px 1px 1px 18px;
  margin-right: 10px;
  &:hover {
    background-color: ${(props) =>
      props.theme.btn_reset_color_hover || '#ff8723'};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.btn_reset_color_active || '#ed5d00'};
  }
`;

const TimerButtonSave = styled(TimerButton)`
  background-color: ${(props) => props.theme.btn_save_color || '#388659'};
  border-radius: 1px 18px 18px 1px;
  margin-left: 10px;
  &:hover {
    background-color: ${(props) =>
      props.theme.btn_save_color_hover || '#549e73'};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.btn_save_color_active || '#2d6f47'};
  }
`;

const TimerButtonStart = styled(TimerButton)`
  background-color: ${(props) => props.theme.btn_start_color || '#067bc2'};
  border-radius: 1px 1px 1px 1px;
  &:hover {
    background-color: ${(props) =>
      props.theme.btn_start_color_hover || '#2c95ce'};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.btn_start_color_active || '#0564a8'};
  }
`;

const TimerButtonStop = styled(TimerButton)`
  background-color: ${(props) => props.theme.btn_stop_color || '#fde94f'};
  color: ${(props) => props.theme.btn_stop_text_color || '#550e04'};
  border-radius: 1px 1px 1px 1px;
  &:hover {
    background-color: ${(props) =>
      props.theme.btn_stop_color_hover || '#fef057'};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.btn_stop_color_active || '#0564a8'};
  }
`;

export {
  TimerButton,
  TimerButtonReset,
  TimerButtonSave,
  TimerButtonStart,
  TimerButtonStop,
};
