import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyledRouter } from '../components/Wrappers';
import Navbar from '../NavbarDropdown/Navbar';
import { AuthenticatedHome } from '../Home/';
import Timer from '../Timer/Timer';
import OfflineTimer from '../Timer/OfflineTimer';
import Stats from '../Stats/Stats';
import { MainWrapper } from '../components/Wrappers';
import * as routes from '../constants/routes';
import { Route } from 'react-router-dom';
import 'styled-components/macro';
// timer related imports
import moment from 'moment';
import { FirebaseContext, AuthContext } from '../firebase/context';
import AddManually from '../AddManually';

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
  const [showEditDescription, setShowEditDescription] = useState(false);

  useEffect(() => {
    setSeconds(timeElapsed);
  }, [timeElapsed]);

  const startTimer = () => {
    setRunning(true);
    const startTime = Math.trunc(new Date().getTime() / 1000);
    setTimerInterval(
      setInterval(() => {
        setTimeElapsed(calculateTimeLeft(startTime, seconds));
      }, 1000)
    );
  };

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

  const handleKeypress = useCallback(
    (event) => {
      console.log(`key pressed: ${event.key}`);
      if (showEditDescription) return;
      const keyPressed = event.key.toLowerCase();
      switch (keyPressed) {
        case ' ':
          if (running) {
            stopTimer();
          } else {
            startTimer();
          }
          break;
        case 's':
          onSave();
          break;
        case 'r':
          resetTimer();
          break;
        default:
          break;
      }
    },
    [running, showEditDescription]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeypress);

    return () => {
      document.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <>
      <Navbar />
      <MainWrapper>
        <StyledRouter>
          <Route element={<AuthenticatedHome />} default path={routes.home} />
          <Route
            element={
              <Timer
                seconds={seconds}
                running={running}
                startTimer={startTimer}
                stopTimer={stopTimer}
                resetTimer={resetTimer}
                onSave={onSave}
                description={description}
                setDescription={setDescription}
                showEditDescription={showEditDescription}
                setShowEditDescription={setShowEditDescription}
              />
            }
            path={routes.timer}
          />
          <Route
            element={
              <OfflineTimer
                seconds={seconds}
                running={running}
                startTimer={startTimer}
                stopTimer={stopTimer}
                resetTimer={resetTimer}
              />
            }
            path={routes.offlineTimer}
          />
          <Route element={<AddManually />} path={routes.add} />
          <Route element={<Stats />} path={routes.stats} />
        </StyledRouter>
      </MainWrapper>
    </>
  );
};

export default AuthenticatedApp;
