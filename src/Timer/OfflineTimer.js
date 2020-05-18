import React, { useState, useEffect } from 'react';
import TimeHistory from './TimeHistory';
import moment from 'moment';

import {
  TimerButtonReset,
  TimerButtonSave,
  TimerButtonStart,
  TimerButtonStop,
} from '../components/Buttons';
import TimerDisplayWrapper from './TimerDisplayWrapper';
import TimerWrapper from './TimerWrapper';

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
const calculateTimeLeft = (start, seconds = 0) =>
  seconds + Math.trunc(new Date().getTime() / 1000) - start;

const Timer = () => {
  const [timesList, setTimesList] = useState([]);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(false);

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

  const removeHistoryItem = (id) => {
    const newHistory = timesList.filter((item) => item.id !== id);
    setTimesList(newHistory);
  };

  const saveTime = () => {
    if (seconds === 0) {
      return;
    }
    const currentDateTime = moment().format('h:mm DD-MM-YY');
    const randomNumber = Math.floor(Math.random() * Math.floor(100));
    const newTime = {
      date: currentDateTime,
      hours: getOnlyHours(seconds),
      minutes: getOnlyMinutes(seconds),
      id: `${currentDateTime}::${seconds}::${randomNumber}`,
    };
    console.log(newTime.id);
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

      <TimeHistory data={timesList} removeHistoryItem={removeHistoryItem} />
    </TimerWrapper>
  );
};

export default Timer;
