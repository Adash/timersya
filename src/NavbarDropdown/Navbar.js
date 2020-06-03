import React, { useState, useContext } from 'react';
import { AuthContext } from '../firebase/context';
import { Link } from '@reach/router';
import * as routes from '../constants/routes';

import styled from 'styled-components';
import 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

//  this needs to exist in order to provide stacking context for the navbar and
//  the dropdown menu, otherwise the navbar becomes a root element of new stacking
//  context making it impossible to position the dropdown behind it
const StackingContext = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
`;

const StyledNav = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* height: 100vh; */

  --bg: #067bc2;
  --bg-accent: #05639e;
  --text-color: #ebe9e9;
  --nav-size: 39px;
  --border: 1px solid #b8c2c6;
  --border-radius: 8px;
  --speed: 500ms;

  width: 100%;
  height: var(--nav-size);
  background-color: var(--bg);
  padding: 0 1rem;
  border-bottom: var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
  }

  /* Slide from the top */
  .drop-enter {
    position: absolute;
    transform: translateY(-110%);
  }
  .drop-enter-active {
    transform: translateY(0%);
    transition: transform 400ms;
  }
  .drop-exit {
    position: absolute;
  }
  .drop-exit-active {
    transform: translateY(-110%);
    transition: transform 400ms;
  }
`;

const StyledUl = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledNavItem = styled.li`
  width: calc(var(--nav-size) * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled.span`
  /* --button-size: calc(var(--nav-size) * 0.5);
  width: var(--button-size);
  height: var(--button-size); */
  background-color: var(--bg-accent);
  border-radius: 4px 4px 4px 4px;
  /* border-radius: 50%; */
  padding: 5px;
  /* margin: 2px; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  cursor: pointer;

  & svg {
    width: 20px;
    height: 20px;
    fill: var(--text-color);
  }
  &:hover {
    filter: brightness(1.2);
  }
`;

const StyledDropdownMenu = styled.div`
  position: absolute;
  width: 290px;
  right: 10px;
  background-color: var(--bg);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 0.8rem;
  overflow: hidden;
  z-index: -1;
  top: 26px;
`;

const StyledDropdownItem = styled.button`
  border: none;
  background-color: transparent;
  color: var(--text-color);
  text-decoration: none;
  width: 100%;
  margin: 0;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--border-radius);
  transition: background var(--speed);
  padding: 0.5rem;

  & .icon-button {
    margin-right: 0.5rem;
  }

  & .icon-button:hover {
    filter: none;
  }

  &:hover {
    background-color: var(--bg-accent);
  }
`;

const IconRight = styled.span`
  fill: var(--text-color);
  /* margin-left: auto; */
  --button-size: calc(var(--nav-size) * 0.7);
  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  transition: filter 300ms;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const DropdownItem = (props) => (
  <StyledDropdownItem
    href="#"
    onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}
  >
    {props.leftIcon && <IconButton>{props.leftIcon}</IconButton>}
    {props.children}
    {props.rightIcon && <IconRight>{props.rightIcon}</IconRight>}
  </StyledDropdownItem>
);

const SimpleDropdownMenu = ({ currentUser }) => {
  return (
    <StyledDropdownMenu>
      <div
        css={`
          width: 100%;
        `}
      >
        <DropdownItem>
          Logged as: {currentUser && currentUser.email}
        </DropdownItem>
        <DropdownItem
          leftIcon={<CogIcon />}
          rightIcon={<ChevronIcon />}
          goToMenu="settings"
        >
          Settings
        </DropdownItem>
        <DropdownItem
          leftIcon={<BellIcon />}
          rightIcon={<ChevronIcon />}
          goToMenu="stats"
        >
          Stats
        </DropdownItem>
        <DropdownItem
          leftIcon={<BoltIcon />}
          rightIcon={<ChevronIcon />}
          goToMenu="theme"
        >
          Theme
        </DropdownItem>
      </div>
    </StyledDropdownMenu>
  );
};

const Logo = () => (
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
          0 0 50px #77cae7, 0 0 60px #77cae7, 0 0 70px #77cae7, 0 0 80px #77cae7;
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
      v0.7.9
    </span>
  </Link>
);

const NavItem = ({ icon, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledNavItem>
      <IconButton href="#" onClick={() => setOpen(!open)}>
        {icon}
      </IconButton>
      <CSSTransition
        in={open}
        timeout={400}
        unmountOnExit
        classNames="drop"
        // try to use nodeRef with this implementation
        // nodeRef={mainRef}
      >
        {children}
      </CSSTransition>
    </StyledNavItem>
  );
};

const NavPlaceholder = () => (
  <div
    css={`
      width: 31.2px;
    `}
  >
    {/* this is here to force proper slignment with flexbox
          it's really a hack to fix it in the future
          */}
  </div>
);

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <StackingContext>
      <StyledNav>
        <NavPlaceholder />
        <Logo />
        {/* the StyledUl is here in order to allow more menu icons for desktop view */}
        <StyledUl>
          {currentUser ? (
            <NavItem icon={<CaretIcon />}>
              <SimpleDropdownMenu currentUser={currentUser} />
            </NavItem>
          ) : (
            <NavPlaceholder />
          )}
        </StyledUl>
      </StyledNav>
    </StackingContext>
  );
};

export default Navbar;
