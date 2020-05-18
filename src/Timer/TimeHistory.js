import React, { useState, useEffect } from 'react';
import 'styled-components/macro';
import { AntiButtonDelete } from '../components/Buttons';
import { auth, db } from '../firebase';

const Record = ({ hours, minutes, seconds, date, id, removeHistoryItem }) => (
  <tr
    css={`
      color: gray;
    `}
  >
    <td
      css={`
        padding-right: 10px;
      `}
    >
      {date}
    </td>
    <td>
      {hours}h{minutes}m{seconds}s
    </td>
    <td>
      <AntiButtonDelete
        onClick={() => {
          removeHistoryItem(id);
        }}
      >
        remove
      </AntiButtonDelete>
    </td>
  </tr>
);

const TimeHistory = ({ data, removeHistoryItem }) => {
  const [firebaseData, setFirebaseData] = useState([]);

  useEffect(() => {
    try {
      db.ref('TimesHistory').on('value', (snapshot) => {
        if (snapshot.val() === null) {
          setFirebaseData([]);
          return;
        }
        const dataArray = Object.entries(snapshot.val()).map(
          ([key, value]) => ({
            ...value,
            id: key,
          })
        );
        console.log(dataArray);
        setFirebaseData(dataArray);
      });
      // in the return statement below pass an cleanup function
      return () => {};
    } catch (error) {
      console.log(`Error happened: ${error}`);
    }
  }, []);

  return (
    <table
      css={`
        list-style: none;
        margin: 1px;
        padding-inline-start: 0px;
        margin-top: 5px;
        width: 350px;
        display: block;
        height: 60%;
        overflow-y: scroll;
      `}
    >
      <thead
        css={`
          background-color: white;
        `}
      >
        <tr>
          <th
            css={`
              padding-right: 10px;
            `}
          >
            When
          </th>
          <th>How long</th>
        </tr>
      </thead>
      <tbody>
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
          <tr>
            <td>No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TimeHistory;
