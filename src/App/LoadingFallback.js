import React from 'react';
import Navbar from '../NavbarDropdown/Navbar';
import DualRing from '../components/Spinners/DualRing';
import 'styled-components/macro';

const LoadingFallback = () => (
  <>
    <Navbar />
    <div
      css={`
        position: absolute;
        top: 40px;
        bottom: 0;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <DualRing color="#067bc2" />
    </div>
  </>
);

export default LoadingFallback;
