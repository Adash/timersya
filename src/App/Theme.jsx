import React from 'react';
import { defaultTheme, darkTheme } from './Themes';
import { ThemeProvider } from 'styled-components';

const Theme = ({ children, theme }) => (
  <ThemeProvider theme={theme ? defaultTheme : darkTheme}>
    {children}
  </ThemeProvider>
);

export default Theme;
