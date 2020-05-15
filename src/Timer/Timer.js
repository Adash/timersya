import React, { useState } from 'react';
import TimeHistory from './TimeHistory';
import moment from 'moment';

import {
  TimerButtonReset,
  TimerButtonSave,
  TimerButtonStart,
  TimerButtonStop,
} from '../components/Buttons';
import TimerWrapper from './TimerWrapper';
import TimerDisplayWrapper from './TimerDisplayWrapper';

const getOnlyHours = (number) =>
  Math.floor((number % (60 * 60 * 24)) / (60 * 60));
const getOnlyMinutes = (number) => Math.floor((number % (60 * 60)) / 60);
const getOnlySeconds = (number) => Math.floor(number % 60);

const PaddedTime = ({ children }) => (
  <>{children.toString().padStart(2, '0')}</>
);

const TimerDisplay = ({ seconds }) => {
  return (
    <TimerDisplayWrapper>
      <PaddedTime>{getOnlyHours(seconds)}</PaddedTime>:
      <PaddedTime>{getOnlyMinutes(seconds)}</PaddedTime>:
      <PaddedTime>{getOnlySeconds(seconds)}</PaddedTime>
    </TimerDisplayWrapper>
  );
};

const Timer = () => {
  const [timesList, setTimesList] = useState([]);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [secondsTimer, setSecondsTimer] = useState(false);

  const startTimer = () => {
    setRunning(true);
    setSecondsTimer(
      setInterval(() => {
        setSeconds((prevState) => prevState + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    setRunning(false);
    clearInterval(secondsTimer);
  };

  const resetTimer = () => {
    setRunning(false);
    clearInterval(secondsTimer);
    setSeconds(0);
  };

  const saveTime = () => {
    const currentDateTime = moment().format('h:mm DD-MM-YY');
    const newTime = {
      date: currentDateTime,
      hours: getOnlyHours(seconds),
      minutes: getOnlyMinutes(seconds),
    };
    setTimesList((prevState) => [...prevState, newTime]);
  };

  return (
    <TimerWrapper>
      <TimerDisplay seconds={seconds} />
      <div>
        <TimerButtonReset onClick={resetTimer}>reset</TimerButtonReset>
        {!running ? (
          <TimerButtonStart onClick={startTimer}>start</TimerButtonStart>
        ) : (
          <TimerButtonStop onClick={stopTimer}>stop</TimerButtonStop>
        )}
        <TimerButtonSave onClick={saveTime}>save</TimerButtonSave>
      </div>

      <TimeHistory data={timesList} />
    </TimerWrapper>
  );
};

export default Timer;
