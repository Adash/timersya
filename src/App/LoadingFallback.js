import React from 'react';
import Header from '../Header';
import 'styled-components/macro';

const LoadingFallback = () => (
  <>
    <Header />
    <div
      css={`
        position: absolute;
        top: 40px;
        bottom: 0;
        width: 100%;
        text-align: center;
      `}
    >
      <p
        css={`
          color: #7a8586;
          margin-top: 5px;
        `}
      >
        Loading...
      </p>
    </div>
  </>
);

export default LoadingFallback;
