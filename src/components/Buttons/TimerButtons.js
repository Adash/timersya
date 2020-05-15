import styled from 'styled-components';

const TimerButton = styled.button`
  background-color: ${(props) => props.color || '#6A8EAE'};
  color: ${(props) => props.textColor || '#ebe9e9'};
  border: none;
  padding: 20px 20px 20px 20px;
  font-size: 1.5rem;
  font-weight: bold;
  transition: 0.3s all ease-out;
  cursor: pointer;
`;

const TimerButtonReset = styled(TimerButton)`
  background-color: #ff6700;
  border-radius: 18px 1px 1px 18px;
  margin-right: 10px;
  &:hover {
    background-color: #ff8723;
  }
  &:active {
    background-color: #ed5d00;
  }
`;

const TimerButtonSave = styled(TimerButton)`
  background-color: #388659;
  border-radius: 1px 18px 18px 1px;
  margin-left: 10px;
  &:hover {
    background-color: #549e73;
  }
  &:active {
    background-color: #2d6f47;
  }
`;

const TimerButtonStart = styled(TimerButton)`
  background-color: #067bc2;
  border-radius: 1px 1px 1px 1px;
  &:hover {
    background-color: #2c95ce;
  }
  &:active {
    background-color: #0564a8;
  }
`;

const TimerButtonStop = styled(TimerButton)`
  background-color: #fde94f;
  color: #550e04;
  border-radius: 1px 1px 1px 1px;
  &:hover {
    background-color: #fef057;
  }
  &:active {
    background-color: #d2ba3f;
  }
`;

export {
  TimerButton,
  TimerButtonReset,
  TimerButtonSave,
  TimerButtonStart,
  TimerButtonStop,
};
