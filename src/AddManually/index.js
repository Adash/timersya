import React, { useContext, useState } from 'react';
import TimerDescription from '../Timer/TimerDescription';
import TimerHistory from '../Timer/TimeHistory';
import { AntiButtonGeneral } from '../components/Buttons/AntiButtons';
import { FirebaseContext, AuthContext } from '../firebase/context';
import moment from 'moment';
import styled from 'styled-components';

const AddWrapper = styled.div`
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
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 4.5rem;
  width: 22rem;
  flex: 0 0 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 6.1rem;
`;

const ToggleWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 7px;
  font-size: 1.5rem;
  width: 370px;
  display: flex;
  justify-content: center;
`;

const getOnlyHours = (number) =>
  Math.floor((number % (60 * 60 * 24)) / (60 * 60));
const getOnlyMinutes = (number) => Math.floor((number % (60 * 60)) / 60);
const getOnlySeconds = (number) => Math.floor(number % 60);

const AddManually = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [description, setDescription] = useState('edit description');
  const { currentUser } = useContext(AuthContext);
  const { saveTime } = useContext(FirebaseContext);

  const onChange = (event, unit) => {
    let newValue = event.target.value.replace(/^[0]+/g, '');
    if (isNaN(newValue) === true) {
      return;
    }
    if (newValue > 60) {
      newValue = 60;
    }

    switch (unit) {
      case 'hours':
        setHours(newValue);
        break;
      case 'minutes':
        setMinutes(newValue);
        break;
      case 'seconds':
        setSeconds(newValue);
        break;
    }
  };

  const submit = () => {
    console.log('submit');
    if (seconds === 0 && minutes === 0 && hours === 0) {
      return;
    }
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setDescription('edit');
    const newTime = {
      date: moment().format('h:mm DD-MM-YY'),
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      description: description,
      user: currentUser.uid,
    };
    saveTime(newTime);
  };

  return (
    <AddWrapper>
      <TimerDisplayWrapper>
        <StyledInput
          value={hours}
          onChange={(event) => onChange(event, 'hours')}
        />
        :
        <StyledInput
          value={minutes}
          onChange={(event) => onChange(event, 'minutes')}
        />
        :
        <StyledInput
          value={seconds}
          onChange={(event) => onChange(event, 'seconds')}
        />
      </TimerDisplayWrapper>
      <AntiButtonGeneral onClick={submit}>Add</AntiButtonGeneral>
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

      <TimerHistory />
    </AddWrapper>
  );
};

export default AddManually;
