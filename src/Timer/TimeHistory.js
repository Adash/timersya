import React, { useState, useEffect, useContext } from 'react';
import 'styled-components/macro';
import styled from 'styled-components';
import { AntiButtonDelete } from '../components/Buttons';
import { db } from '../firebase/Firebase';
import { AuthContext } from '../firebase/authentication';

// some Consts for display mode of each element on the times history
const DISPLAY = {
  TIME: 'TIME',
  OPTIONS: 'OPTIONS',
  DATE: 'DATE',
};
//#

const OptionsButton = styled.button`
  background-color: ${(props) => (props.pressed ? '#fde74c' : '#067bc2')};
  color: ${(props) => (props.pressed ? '#550e04' : '#ebe9e9')};
  border: none;
  border-radius: 1px 1px 1px 1px;
  padding: 6px 10px 6px 10px;
`;

const ButtonBar = ({ displayMode, setDisplayMode }) => (
  <div
    css={`
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    `}
  >
    <OptionsButton
      onClick={() => {
        setDisplayMode(DISPLAY.TIME);
      }}
      css={`
        border-radius: 9px 1px 1px 9px;
      `}
      pressed={displayMode === DISPLAY.TIME}
    >
      Time
    </OptionsButton>
    <OptionsButton
      onClick={() => {
        setDisplayMode(DISPLAY.OPTIONS);
      }}
      css={`
        border-radius: 1px 1px 1px 1px;
      `}
      pressed={displayMode === DISPLAY.OPTIONS}
    >
      Options
    </OptionsButton>
    <OptionsButton
      onClick={() => {
        setDisplayMode(DISPLAY.DATE);
      }}
      css={`
        border-radius: 1px 9px 9px 1px;
      `}
      pressed={displayMode === DISPLAY.DATE}
    >
      Date
    </OptionsButton>
  </div>
);

const RecordWrapper = styled.div`
  width: 100%;
  color: #2d6f47;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 7px;
`;

const Record = ({
  item: { hours, minutes, seconds, date, id, description },
  removeHistoryItem,
  displayMode,
}) => {
  switch (displayMode) {
    case DISPLAY.TIME:
      return (
        <RecordWrapper>
          <span
            css={`
              color: #292e30;
            `}
          >
            {hours}:{minutes}:{seconds}
          </span>
          <span>{description}</span>
        </RecordWrapper>
      );
    case DISPLAY.DATE:
      return (
        <RecordWrapper>
          <span>{date}</span>
        </RecordWrapper>
      );
    case DISPLAY.OPTIONS:
      return (
        <RecordWrapper>
          <AntiButtonDelete
            onClick={() => {
              removeHistoryItem(id);
            }}
          >
            remove
          </AntiButtonDelete>
          <span>{description}</span>
        </RecordWrapper>
      );
    default:
      return null;
  }
};

const TimeHistory = ({ removeHistoryItem }) => {
  const [firebaseData, setFirebaseData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [displayMode, setDisplayMode] = useState('TIME');

  useEffect(() => {
    try {
      db.ref('TimesHistory').on('value', (snapshot) => {
        if (snapshot.val() === null) {
          setFirebaseData([]);
          return;
        }
        // ok this way of filtering will work but come up with something
        // which will perform better at scale (10000+ users)
        const dataArray = Object.entries(snapshot.val())
          .map(([key, value]) => ({
            ...value,
            id: key,
          }))
          .filter((item) => item.user === currentUser.uid);
        console.log(dataArray);
        setFirebaseData(dataArray);
      });
      // in the return statement below pass an cleanup function
      return () => {};
    } catch (error) {
      console.log(`Error happened: ${error}`);
    }
  }, [currentUser.uid]);

  return (
    <div
      css={`
        padding-inline-start: 0px;
        margin-top: 10px;
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        overflow-y: scroll;
      `}
    >
      <ButtonBar displayMode={displayMode} setDisplayMode={setDisplayMode} />
      <div
        css={`
          width: 100%;
        `}
      >
        {Array.isArray(firebaseData) ? (
          firebaseData.map((item) => (
            <Record
              item={item}
              removeHistoryItem={removeHistoryItem}
              displayMode={displayMode}
            />
          ))
        ) : (
          <div>
            <p>No Data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeHistory;
