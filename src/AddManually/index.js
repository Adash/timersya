import React, { useEffect, useState } from 'react';
import TimerDescription from '../Timer/TimerDescription';
import { AntiButtonGeneral } from '../components/Buttons/AntiButtons';
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

const StyledInput = styled.input`
  width: 6.1rem;
`;

const ToggleWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 7px;
  font-size: 1.5rem;
`;

const getHours = (number) => Math.floor((number % (60 * 60 * 24)) / (60 * 60));
const getMinutes = (number) => Math.floor((number % (60 * 60)) / 60);
const getSeconds = (number) => Math.floor(number % 60);

const AddManually = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [description, setDescription] = useState('description');

  // useEffect(()=>{},[minutes])

  // const addHours = (event) => {
  //   const newHours = event.target.value;

  //   if (isNaN(newHours) === true) {
  //     return;
  //   }
  //   if (newHours > 60) {
  //     setSeconds(60);
  //     return;
  //   }
  //   setSeconds(newHours);
  // };

  // const addMinutes = (event) => {
  //   const newMinutes = event.target.value;
  //   if (isNaN(minutes) === true) {
  //     return;
  //   }
  //   if (minutes > 60) {
  //     setSeconds(minutes * 60);
  //     return;
  //   }
  //   setSeconds((prevState) => minutes * 60 + prevState);
  // };

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

  return (
    <AddWrapper>
      <h1>AddManually</h1>

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
    </AddWrapper>
  );
};

export default AddManually;
