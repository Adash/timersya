import styled from 'styled-components';

const BTimerButton = styled.button`
  background-color: ${(props) => props.color || '#6A8EAE'};
  color: ${(props) => props.textColor || '#ebe9e9'};
  border: none;
  padding: 20px 20px 20px 20px;
  font-size: 1.6rem;
  :hover {
    background-color: ${(props) => props.hoverColor || '#6A8EAE'};
  }
  :active {
    background-color: ${(props) => props.activeColor || '#6A8EAE'};
  }
`;

const BTimerButtonLeft = styled(TimerButton)`
  border-radius: 18px 1px 1px 18px;
  margin-right: 10px;
`;

const BTimerButtonRight = styled(TimerButton)`
  border-radius: 1px 18px 18px 1px;
  margin-left: 10px;
`;

const BTimerButtonMiddle = styled(TimerButton)`
  border-radius: 1px 1px 1px 1px;
`;

export {
  BTimerButton,
  BTimerButtonLeft,
  BTimerButtonRight,
  BTimerButtonMiddle,
};
