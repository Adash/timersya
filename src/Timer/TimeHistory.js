import React from 'react';
import 'styled-components/macro';

const Record = ({ hours, minutes, date }) => (
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
      {hours}h{minutes}m
    </td>
  </tr>
);

const TimeHistory = ({ data }) => {
  return (
    <table
      css={`
        list-style: none;
        margin: 1px;
        padding-inline-start: 0px;
        margin-top: 5px;
        width: 350px;
        max-height: 50%;
        overflow: scroll;
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
        {Array.isArray(data) ? (
          data.map((item) => (
            <Record
              key={item.date}
              hours={item.hours}
              minutes={item.minutes}
              date={item.date}
            />
          ))
        ) : (
          <p>No Data</p>
        )}
      </tbody>
    </table>
  );
};

export default TimeHistory;
