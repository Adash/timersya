import React, { useState, useEffect, useContext } from 'react';
import TimeHistory from './TimeHistory';
import moment from 'moment';
import { db } from '../firebase/Firebase';
import { AuthContext } from '../firebase/authentication';

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
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(false);
  const { currentUser } = useContext(AuthContext);

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
    db.ref(`TimesHistory/${id}`).remove();
  };

  const saveTime = () => {
    if (seconds === 0) {
      return;
    }
    const newTime = {
      date: moment().format('h:mm DD-MM-YY'),
      hours: getOnlyHours(seconds),
      minutes: getOnlyMinutes(seconds),
      seconds: getOnlySeconds(seconds),
      description: 'OmManiPemeHung',
      user: currentUser.uid,
    };
    try {
      db.ref('TimesHistory').push(newTime);
    } catch (error) {
      console.log(`Some data fetching error: ${error}`);
    }
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

      <TimeHistory removeHistoryItem={removeHistoryItem} />
    </TimerWrapper>
  );
};

export default Timer;
