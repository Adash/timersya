import React from 'react';
import 'styled-components/macro';
import colors from '../resources/colors';
// import menuLogo from '../resources/icons/menu.png';

const Header = () => {
  return (
    <div
      css={`
        background-color: white;
        color: ${colors.gunmetal};
        width: 100%;
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #b8c2c6;
        justify-content: center;
      `}
    >
      {/* <a src={menuLogo} href="/" style={{ size: 10 }} alt="home"></a> */}
      <span
        css={`
          font-size: 1.5rem;
          font-weight: bold;
        `}
      >
        T i m e r s y a
      </span>
      {/* <a src={menuLogo} href="/" alt="home"></a> */}
    </div>
  );
};

export default Header;
