import React from 'react';
import styled from 'styled-components';

const StatsWrapper = styled.div`
  background-color: lightblue;
  position: fixed;
  top: var(--nav-size);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Stats = () => {
  return (
    <StatsWrapper>
      <p>stats</p>
    </StatsWrapper>
  );
};

export default Stats;
