import React, { useState, useEffect, useContext } from 'react';
import { StyledRouter } from '../components/Wrappers';
// import Header from '../Header';
import Navbar from '../NavbarDropdown/Navbar';
import { AuthenticatedHome } from '../Home/';
import Timer from '../Timer/Timer';
import Stats from '../Stats/Stats';
import { MainWrapper } from '../components/Wrappers';
import * as routes from '../constants/routes';
import 'styled-components/macro';
// timer related imports
import moment from 'moment';
import { FirebaseContext, AuthContext } from '../firebase/context';

const getOnlyHours = (number) =>
  Math.floor((number % (60 * 60 * 24)) / (60 * 60));
const getOnlyMinutes = (number) => Math.floor((number % (60 * 60)) / 60);
const getOnlySeconds = (number) => Math.floor(number % 60);

const calculateTimeLeft = (start, seconds = 0) =>
  seconds + Math.trunc(new Date().getTime() / 1000) - start;

const AuthenticatedApp = () => {
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
    <>
      <Navbar />
      <MainWrapper>
        <StyledRouter>
          <AuthenticatedHome default path={routes.home} />
          <Timer
            path={routes.timer}
            seconds={seconds}
            running={running}
            startTimer={startTimer}
            stopTimer={stopTimer}
            resetTimer={resetTimer}
            onSave={onSave}
            description={description}
            setDescription={setDescription}
          />
          <Stats path={routes.stats} />
        </StyledRouter>
      </MainWrapper>
    </>
  );
};

export default AuthenticatedApp;
