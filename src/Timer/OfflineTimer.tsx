import React, { useState, useEffect, FC } from 'react';
import TimerDescription from './TimerDescription';
import { AntiButtonGeneral } from '../components/Buttons/AntiButtons';
import moment from 'moment';

import {
  TimerButtonReset,
  TimerButtonSave,
  TimerButtonStart,
  TimerButtonStop,
} from '../components/Buttons';
import styled from 'styled-components';

const storedTimeInitialValue = {
  date: '0:0 00-00-00',
  hours: 0,
  minutes: 0,
  seconds: 0,
  time: 0,
  description: '',
  user: '',
};
type TimerDisplayWrapperProps = { theme: object; running: boolean };
type OfflineTimerProps = {
  seconds: number;
  running: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
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

const TimerDisplayWrapper = styled.div<TimerDisplayWrapperProps>`
  font-weight: ${({ theme }) => theme.timer_font_weight || 'bold'};
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

const OfflineTimer = ({
  seconds,
  running,
  startTimer,
  stopTimer,
  resetTimer,
}: OfflineTimerProps) => {
  const [description, setDescription] = useState('edit');
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [storedTime, setStoredTime] = useState(storedTimeInitialValue);

  useEffect(() => {
    const localStorageObject = JSON.parse(
      localStorage.getItem('offlineStoredTime') || '{}'
    );
    setStoredTime(localStorageObject);
  }, []);

  const onSave = () => {
    if (seconds === 0) return;
    const newTime = {
      date: moment().format('h:mm DD-MM-YY'),
      hours: getOnlyHours(seconds),
      minutes: getOnlyMinutes(seconds),
      seconds: getOnlySeconds(seconds),
      time: seconds,
      description: description,
      user: 'offline',
    };
    localStorage.setItem('offlineStoredTime', JSON.stringify(newTime));
    setStoredTime(newTime);
    setDescription('edit');
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
          <AntiButtonGeneral onClick={() => setShowEditDescription(true)}>
            {description}
          </AntiButtonGeneral>
        )}
      </ToggleWrapper>
      <div
      // css={`
      //   flex-basis: 13%;
      // `}
      >
        <TimerButtonReset onClick={resetTimer}>reset</TimerButtonReset>
        {!running ? (
          <TimerButtonStart onClick={startTimer}>start</TimerButtonStart>
        ) : (
          <TimerButtonStop onClick={stopTimer}>stop</TimerButtonStop>
        )}
        <TimerButtonSave onClick={onSave}>save</TimerButtonSave>
      </div>
      {storedTime ? (
        <div>
          <h2>saved time</h2>
          <p>seconds: {storedTime.seconds}</p>
          <p>date: {storedTime.date}</p>
          <p>description: {storedTime.description}</p>
        </div>
      ) : (
        <div>
          <p>no stored time</p>
        </div>
      )}
      <AntiButtonGeneral
        onClick={() => {
          const localStorageTest = JSON.parse(
            localStorage.getItem('offlineStoredTime') || '{}'
          );
          console.log(localStorageTest);
        }}
      >
        dump
      </AntiButtonGeneral>
    </TimerWrapper>
  );
};

export default OfflineTimer;
