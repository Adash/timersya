import React, { useState, useEffect, useContext } from 'react';
import TimeHistory from './TimeHistory';
import moment from 'moment';
import { FirebaseContext, AuthContext } from '../firebase/context';
import TimerDescription from './TimerDescription';
import { AntiButtonGeneral } from '../components/Buttons/AntiButtons';

import {
  TimerButtonReset,
  TimerButtonSave,
  TimerButtonStart,
  TimerButtonStop,
} from '../components/Buttons';
import styled from 'styled-components';

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
  color: ${({ theme, running }) =>
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

const getOnlyHours = (number) =>
  Math.floor((number % (60 * 60 * 24)) / (60 * 60));
const getOnlyMinutes = (number) => Math.floor((number % (60 * 60)) / 60);
const getOnlySeconds = (number) => Math.floor(number % 60);

const PaddedTime = ({ children }) => (
  <StyledDigits>{children.toString().padStart(2, '0')}</StyledDigits>
);

const TimerDisplay = ({ seconds, running }) => {
  return (
    <TimerDisplayWrapper running={running}>
      <PaddedTime>{getOnlyHours(seconds)}</PaddedTime>:
      <PaddedTime>{getOnlyMinutes(seconds)}</PaddedTime>:
      <PaddedTime>{getOnlySeconds(seconds)}</PaddedTime>
    </TimerDisplayWrapper>
  );
};
const calculateTimeLeft = (start, seconds = 0) =>
  seconds + Math.trunc(new Date().getTime() / 1000) - start;

const Timer = () => {
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [description, setDescription] = useState('edit');
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { saveTime } = useContext(FirebaseContext);

  const startTimer = () => {
    setRunning(true);
    const startTime = Math.trunc(new Date().getTime() / 1000);
    setTimerInterval(
      setInterval(() => {
        setTimeElapsed(calculateTimeLeft(startTime, seconds));
      }, 1000)
    );
  };

  useEffect(() => {
    setSeconds(timeElapsed);
  }, [timeElapsed]);

  const stopTimer = () => {
    setRunning(false);
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    setRunning(false);
    clearInterval(timerInterval);
    setSeconds(0);
  };

  const onSave = () => {
    if (seconds === 0) {
      return;
    }
    resetTimer();
    setDescription('edit');
    const newTime = {
      date: moment().format('h:mm DD-MM-YY'),
      hours: getOnlyHours(seconds),
      minutes: getOnlyMinutes(seconds),
      seconds: getOnlySeconds(seconds),
      description: description,
      user: currentUser.uid,
    };
    saveTime(newTime);
  };

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
          <AntiButtonGeneral
            onClick={() => setShowEditDescription(true)}
            css={`
              cursor: pointer;
            `}
          >
            {description}
          </AntiButtonGeneral>
        )}
      </ToggleWrapper>
      <div
        css={`
          flex-basis: 13%;
        `}
      >
        <TimerButtonReset onClick={resetTimer}>reset</TimerButtonReset>
        {!running ? (
          <TimerButtonStart onClick={startTimer}>start</TimerButtonStart>
        ) : (
          <TimerButtonStop onClick={stopTimer}>stop</TimerButtonStop>
        )}
        <TimerButtonSave onClick={onSave}>save</TimerButtonSave>
      </div>

      <TimeHistory />
    </TimerWrapper>
  );
};

export default Timer;
