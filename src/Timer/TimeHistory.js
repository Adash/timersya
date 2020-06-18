import React, { useState, useEffect, useContext, useRef } from 'react';
import 'styled-components/macro';
import styled from 'styled-components';
import {
  AntiButtonDelete,
  AntiButtonOK,
} from '../components/Buttons/AntiButtons';
import { NakedInput } from '../components/Elements';
import { FirebaseContext, AuthContext } from '../firebase/context';

// some Consts for display mode of each element on the times history
const DISPLAY = {
  TIME: 'TIME',
  OPTIONS: 'OPTIONS',
  DATE: 'DATE',
};
//#
// Styles
const TimesHistoryWrapper = styled.div`
  --btn-options: ${(props) => props.theme.btn_options || '#067bc2'}
  --btn-options-pressed: ${(props) =>
    props.theme.btn_options_pressed || '#fde74c'}
  --btn-options-text: ${(props) => props.theme.btn_options_text || '#ebe9e9'}
  --btn-options-text-pressed: ${(props) =>
    props.theme.btn_options_text_pressed || '#550e04'}
  flex: 0 0 68%;
  overflow-y: hidden;
  padding-inline-start: 0px;
  margin-top: 10px;
  width: 380px;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const TimesHistoryListWrapper = styled.div`
  overflow-y: auto;
  padding-right: 10px;
  width: 100%;
`;

const StyledButtonBar = styled.div`
  flex: 0 0 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const OptionsButton = styled.button`
  background-color: ${({
    pressed,
    theme: {
      btn_options: {
        color: { base, active },
      },
    },
  }) => (pressed ? active : base)};
  color: ${({
    pressed,
    theme: {
      btn_options: {
        color: { text, text_active },
      },
    },
  }) => (pressed ? text_active : text)};
  border: none;
  border-radius: 1px 1px 1px 1px;
  padding: 6px 10px 6px 10px;
`;

const RecordWrapper = styled.div`
  width: 100%;
  color: #2d6f47;
  padding: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 7px;
  font-size: 1.2rem;
`;

const RecordOptionsWrapper = styled(RecordWrapper)`
  justify-content: flex-start;
`;

// end Styles

const ButtonBar = ({ displayMode, setDisplayMode }) => (
  <StyledButtonBar>
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
  </StyledButtonBar>
);

const Record = ({
  item: { hours, minutes, seconds, date, id, description },
  removeHistoryItem,
  editDescription,
  displayMode,
}) => {
  const [showEditField, setShowEditField] = useState(false);
  const editFieldRef = useRef(null);

  switch (displayMode) {
    case DISPLAY.TIME:
      return (
        // in the future extract those into separate components
        <RecordWrapper>
          <div
            css={`
              text-align: right;
              width: 70px;
            `}
          >
            <span
              css={`
                color: ${(props) =>
                  props.theme.time_history_color || '#067bc2'};
              `}
            >
              <span>{hours}:</span>
              <span>{minutes}:</span>
              <span>{seconds}</span>
            </span>
          </div>
          {showEditField ? (
            <DescriptionInputField
              id={id}
              description={description}
              editDescription={editDescription}
              setShowEditField={setShowEditField}
            />
          ) : (
            <div
              onClick={() => setShowEditField(true)}
              css={`
                flex: 1 1 auto;
                text-align: right;
              `}
            >
              {description}
            </div>
          )}
        </RecordWrapper>
      );
    case DISPLAY.DATE:
      return (
        <RecordWrapper>
          <span
            css={`
              color: #3d5a80;
            `}
          >
            {date}
          </span>
          <div
            css={`
              flex: 1 1 auto;
              text-align: right;
            `}
          >
            {description}
          </div>
        </RecordWrapper>
      );
    case DISPLAY.OPTIONS:
      return (
        <RecordOptionsWrapper>
          <AntiButtonDelete
            onClick={() => {
              removeHistoryItem(id);
            }}
            css={`
              flex: 0 0 auto;
            `}
          >
            remove
          </AntiButtonDelete>

          <div
            css={`
              flex: 1 1 auto;
              text-align: right;
            `}
          >
            {description}
          </div>
        </RecordOptionsWrapper>
      );
    default:
      return null;
  }
};

// gets displayed when you clik <edit> while on the options view
const DescriptionInputField = ({
  id,
  description,
  editDescription,
  setShowEditField,
}) => {
  const [newDescription, setNewDescription] = useState(description);
  const onEdit = (e) => {
    e.preventDefault();
    editDescription(id, newDescription);
    setShowEditField(false);
  };

  return (
    <form onSubmit={onEdit}>
      <NakedInput
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <AntiButtonOK type="submit">save</AntiButtonOK>
    </form>
  );
};

const TimeHistory = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const [displayMode, setDisplayMode] = useState('TIME');
  const { currentUser } = useContext(AuthContext);
  const { timesHistory, removeHistoryItem, editDescription } = useContext(
    FirebaseContext
  );

  useEffect(() => {
    try {
      timesHistory().on('value', (snapshot) => {
        console.log('Firebase_Datafetch function triggered');
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
      // cleanup function
      return () => {
        console.log('Firebase_Datafetch cleanup function triggered');
        timesHistory().off();
      };
    } catch (error) {
      console.log(`Error happened: ${error}`);
    }
  }, [currentUser.uid, timesHistory]);

  return (
    <TimesHistoryWrapper>
      <ButtonBar displayMode={displayMode} setDisplayMode={setDisplayMode} />
      <TimesHistoryListWrapper>
        {Array.isArray(firebaseData) ? (
          firebaseData.map((item) => (
            <Record
              key={item.id}
              item={item}
              removeHistoryItem={removeHistoryItem}
              editDescription={editDescription}
              displayMode={displayMode}
            />
          ))
        ) : (
          <div>
            <p>No Data</p>
          </div>
        )}
      </TimesHistoryListWrapper>
    </TimesHistoryWrapper>
  );
};

export default TimeHistory;
