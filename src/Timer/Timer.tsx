import React, { useState } from 'react';
import TimeHistory from './TimeHistory';
import TimerDescription from './TimerDescription';
import { AntiButtonGeneral } from '../components/Buttons/AntiButtons';
import { navigate } from '@reach/router';
import * as routes from '../constants/routes';

import {
  TimerButtonReset,
  TimerButtonSave,
  TimerButtonStart,
  TimerButtonStop,
} from '../components/Buttons';
import styled from 'styled-components';

type TimerProps = {
  seconds: number;
  running: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  onSave: () => void;
  description: string;
  setDescription: () => void;
};

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* top: var(--nav-size); */
`;

const TimerDisplayWrapper = styled.div`
  font-weight: ${(props) => props.theme.timer_font_weight || 'bold'};
  color: ${({ theme, running }: { theme: any; running: boolean }) =>
    running ? theme.timer_color_active : theme.timer_color};
  line-height: 0.9;
  margin-top: 5px;
  margin-bottom: 0rem;
  font-size: 4.5rem;
  width: 22rem;
  flex: 0 0 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ToggleWrapper = styled.div`
  position: relative;
  margin-top: 0px;
  margin-bottom: 7px;
  font-size: 1.5rem;
`;

const StyledDigits = styled.div`
  width: 6.1rem;
`;

const FlexBasis13 = styled.div`
  flex-basis: 13%;
`;

const getOnlyHours = (number: number) =>
  Math.floor((number % (60 * 60 * 24)) / (60 * 60));
const getOnlyMinutes = (number: number) =>
  Math.floor((number % (60 * 60)) / 60);
const getOnlySeconds = (number: number) => Math.floor(number % 60);

const PaddedTime = ({ children }: { children: number }) => (
  <StyledDigits>{children.toString().padStart(2, '0')}</StyledDigits>
);

const TimerDisplay = ({
  seconds,
  running,
}: {
  seconds: number;
  running: boolean;
}) => {
  return (
    <TimerDisplayWrapper running={running}>
      <PaddedTime>{getOnlyHours(seconds)}</PaddedTime>:
      <PaddedTime>{getOnlyMinutes(seconds)}</PaddedTime>:
      <PaddedTime>{getOnlySeconds(seconds)}</PaddedTime>
    </TimerDisplayWrapper>
  );
};

const Timer = ({
  seconds,
  running,
  startTimer,
  stopTimer,
  resetTimer,
  onSave,
  description,
  setDescription,
}: TimerProps) => {
  const [showEditDescription, setShowEditDescription] = useState(false);
  return (
    <TimerWrapper>
      <TimerDisplay seconds={seconds} running={running} />
      <ToggleWrapper>
        {showEditDescription ? (
          <TimerDescription
            description={description}
            setDescription={setDescription}
            setShowEditDescription={setShowEditDescription}
          />
        ) : (
          <AntiButtonGeneral onClick={() => setShowEditDescription(true)}>
            {description}
          </AntiButtonGeneral>
        )}
      </ToggleWrapper>
      <FlexBasis13>
        <TimerButtonReset onClick={resetTimer}>reset</TimerButtonReset>
        {!running ? (
          <TimerButtonStart onClick={startTimer}>start</TimerButtonStart>
        ) : (
          <TimerButtonStop onClick={stopTimer}>stop</TimerButtonStop>
        )}
        <TimerButtonSave onClick={onSave}>save</TimerButtonSave>
      </FlexBasis13>
      <AntiButtonGeneral
        onClick={() => {
          navigate(routes.stats);
        }}
      >
        ShowStats
      </AntiButtonGeneral>
      <TimeHistory />
    </TimerWrapper>
  );
};

export default Timer;
