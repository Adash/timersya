import React from 'react';
import * as routes from '../constants/routes';
import { Link } from '@reach/router';
import 'styled-components/macro';

const Logo = () => (
  <Link
    to={routes.home}
    css={`
      color: ${(props) => props.theme.logo_color || '#ebe9e9'};
      text-decoration: none;
      &:hover {
        text-decoration: none;
        color: ${(props) => props.theme.logo_color_hover || '#fbfbfb'};
      }
      &:active {
        color: ${(props) => props.theme.logo_color_active || '#0b4f6c'};
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
      v0.8.0.0
    </span>
  </Link>
);

export default Logo;
