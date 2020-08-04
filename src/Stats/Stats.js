import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import useGetFirebaseData from '../hooks/DataFetchinHook';

const StyledButtonBar = styled.div`
  width: 95%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StatsWrapper = styled.div`
  position: fixed;
  top: var(--nav-size);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDescription = styled.div`
  color: ${(props) => props.theme.base_color};
  font-size: 1rem;
`;

// ## Reducer Funcions ##
// shared routine for merging data
function mergeData(collector, record, key) {
  if (collector[key]) {
    collector[key] = {
      ...collector[key],
      totalMinutes:
        collector[key].totalMinutes + record.hours * 60 + record.minutes,
      sessionsInaDay: collector[key].sessionsInaDay + 1,
    };
  } else {
    collector[key] = {
      ...record,
      totalMinutes: record.hours * 60 + record.minutes,
      day: key,
      sessionsInaDay: 1,
    };
  }
  return collector;
}

function mergeDays(collector, record) {
  let key = record.date.slice(record.date.length - 8);
  return mergeData(collector, record, key);
}

function mergeDescription(collector, record) {
  let key = record.description;
  return mergeData(collector, record, key);
}

const Graph = ({ data, currentTheme }) => (
  <BarChart width={355} height={530} data={data} layout="vertical">
    <CartesianGrid strokeDasharray="2 2" />
    <Tooltip />
    <XAxis type="number" />
    <YAxis dataKey="day" width={75} type="category" />
    <Bar dataKey="totalMinutes" fill={currentTheme.base_color} />
  </BarChart>
);

const Stats = () => {
  const firebaseData = useGetFirebaseData();
  const [data, setData] = useState([]);
  const [showTime, setShowTime] = useState(true);
  const currentTheme = useContext(ThemeContext);

  useEffect(() => {
    if (
      firebaseData !== 'undefined' &&
      Array.isArray(firebaseData) &&
      firebaseData.length
    ) {
      let reducerFunction = showTime ? mergeDays : mergeDescription;
      setData(Object.values(firebaseData.reduce(reducerFunction, {})));
    }
  }, [firebaseData, setData, showTime]);

  return (
    <StatsWrapper>
      <StyledButtonBar>
        <OptionsButton
          onClick={() => {
            setShowTime(true);
          }}
          css={`
            border-radius: 9px 1px 1px 9px;
          `}
          pressed={showTime}
        >
          Time
        </OptionsButton>
        <StyledDescription>
          {showTime ? (
            <span>Total minutes in a day</span>
          ) : (
            <span>Total minutes per task</span>
          )}
        </StyledDescription>
        <OptionsButton
          onClick={() => {
            setShowTime(false);
          }}
          css={`
            border-radius: 1px 9px 9px 1px;
          `}
          pressed={!showTime}
        >
          Description
        </OptionsButton>
      </StyledButtonBar>
      <Graph data={data} currentTheme={currentTheme} />
    </StatsWrapper>
  );
};

export default Stats;
