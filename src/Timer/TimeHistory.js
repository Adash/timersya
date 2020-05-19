import React, { useState, useEffect, useContext } from 'react';
import 'styled-components/macro';
import { AntiButtonDelete } from '../components/Buttons';
import { db } from '../firebase/Firebase';
import { AuthContext } from '../firebase/authentication';

const Record = ({ hours, minutes, seconds, date, id, removeHistoryItem }) => {
  const [showButtons, setShowButtons] = useState(false);
  return (
    <div
      css={`
        widht: 100%;
        color: #2d6f47;
        cursor: pointer;
        margin-bottom: 7px;
      `}
    >
      <button
        onClick={() => {
          setShowButtons((prevState) => !prevState);
        }}
        css={`
          background-color: #42bfdd;
          color: #ebe9e9;
          border: none;
          border-radius: 9px 1px 1px 9px;
          margin-right: 4px;
        `}
      >
        {showButtons ? 'Time' : 'Options'}
      </button>
      {!showButtons ? (
        <>
          <span
            css={`
              padding-right: 10px;
            `}
          >
            {date}
          </span>
          <span>
            {hours}h{minutes}m{seconds}s
          </span>
        </>
      ) : (
        <span>
          <AntiButtonDelete
            onClick={() => {
              removeHistoryItem(id);
            }}
          >
            remove
          </AntiButtonDelete>
        </span>
      )}
    </div>
  );
};

const TimeHistory = ({ removeHistoryItem }) => {
  const [firebaseData, setFirebaseData] = useState([]);
  const { currentUser } = useContext(AuthContext);

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
        margin: 1px;
        padding-inline-start: 0px;
        margin-top: 20px;
        width: 350px;
        height: 65%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        overflow-y: scroll;
      `}
    >
      <div
        css={`
          width: 100%;
        `}
      >
        {Array.isArray(firebaseData) ? (
          firebaseData.map((item) => (
            <Record
              key={item.id}
              hours={item.hours}
              minutes={item.minutes}
              seconds={item.seconds}
              date={item.date}
              id={item.id}
              removeHistoryItem={removeHistoryItem}
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
