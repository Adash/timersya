import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import useGetFirebaseData from '../hooks/DataFetchinHook';

const StatsWrapper = styled.div`
  position: fixed;
  top: var(--nav-size);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function mergeDays(collector, record) {
  let key = record.date.slice(record.date.length - 8);
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

const Stats = () => {
  const firebaseData = useGetFirebaseData();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (
      firebaseData !== 'undefined' &&
      Array.isArray(firebaseData) &&
      firebaseData.length
    ) {
      let processedData = Object.values(firebaseData.reduce(mergeDays, {}));
      setData(processedData);
    }
  }, [firebaseData, setData, mergeDays]);

  return (
    <StatsWrapper>
      <p>Total minutes in a day</p>
      <BarChart width={355} height={560} data={data} layout="vertical">
        <CartesianGrid strokeDasharray="2 2" />
        <Tooltip />
        <XAxis type="number" />
        <YAxis dataKey="day" width={95} type="category" />
        <Bar dataKey="totalMinutes" fill="#067bc2" />
      </BarChart>
    </StatsWrapper>
  );
};

export default Stats;
