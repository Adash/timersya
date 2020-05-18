import React from 'react';
import 'styled-components/macro';
import * as routes from '../constants/routes';
import { Link } from '@reach/router';

const Header = () => {
  return (
    <div
      css={`
        background-color: #067bc2;
        color: #ebe9e9;
        width: 100%;
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #b8c2c6;
        justify-content: center;
      `}
    >
      {/* <a src={menuLogo} href="/" style={{ size: 10 }} alt="home"></a> */}
      <Link
        to={routes.home}
        css={`
          color: #ebe9e9;
          text-decoration: none;
          &:hover {
            text-decoration: none;
            color: #fbfbfb;
          }
          &:active {
            color: #0b4f6c;
            text-shadow: 0 0 20px #fff, 0 0 30px #77cae7, 0 0 40px #77cae7,
              0 0 50px #77cae7, 0 0 60px #77cae7, 0 0 70px #77cae7,
              0 0 80px #77cae7;
          }
        `}
      >
        <span
          css={`
            font-size: 1.5rem;
            font-weight: bold;
          `}
        >
          T i m e r s y a
        </span>
        <span
          css={`
            font-size: 0.5rem;
          `}
        >
          v0.35
        </span>
      </Link>
      {/* <a src={menuLogo} href="/" alt="home"></a> */}
    </div>
  );
};

export default Header;
