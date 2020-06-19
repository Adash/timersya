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

const Stats = () => {
  const firebaseData = useGetFirebaseData();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (firebaseData !== 'undefined' && Array.isArray(firebaseData)) {
      let processedData = firebaseData.map((element) => ({
        ...element,
        totalMinutes: element.hours * 60 + element.minutes,
      }));
      setData(processedData);
      // alert('hey');
    }
  }, [firebaseData, setData]);

  return (
    <StatsWrapper>
      <p>stats</p>
      <button
        onClick={() => {
          console.log(firebaseData);
        }}
      >
        get firebase data into console
      </button>
      <BarChart width={350} height={630} data={data} layout="vertical">
        <CartesianGrid strokeDasharray="2 2" />
        <Tooltip />
        <XAxis type="number" />
        <YAxis dataKey="description" type="category" />
        <Bar dataKey="totalMinutes" fill="#067bc2" />
      </BarChart>
    </StatsWrapper>
  );
};

export default Stats;
