import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../firebase/context';
import { Link, navigate } from '@reach/router';
import * as routes from '../constants/routes';

import styled from 'styled-components';
import 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';

import ToggleTheme from '../components/Buttons/ThemeToggle';
import { ReactComponent as Sun } from './icons/sun.svg';
import { ReactComponent as Moon } from './icons/moon.svg';
import { ThemeContext } from '../App/App';

import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
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

  --bg: ${(props) => props.theme.navbar_bg || '#067bc2'};
  --bg-accent: ${(props) => props.theme.navbar_bg_accent || '#05639e'};
  --text-color: ${(props) => props.theme.navbar_text_color || '#ebe9e9'};
  --nav-size: ${(props) => props.theme.navbar_nav_size || '39px'};
  --border: 1px solid var(--bg-accent);
  --border-radius: 8px;
  --speed: ${(props) => props.theme.speed || '500ms'};

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
    transition: transform var(--speed);
  }
  .drop-exit {
    position: absolute;
  }
  .drop-exit-active {
    transform: translateY(-110%);
    transition: transform var(--speed);
  }

  /* Sub-menu transition classes  */
  .menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  .menu-primary-enter-active {
    transform: translateX(0%);
    transition: all var(--speed) ease;
  }
  .menu-primary-exit {
    position: absolute;
  }
  .menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all var(--speed) ease;
  }

  .menu-secondary-enter {
    transform: translateX(110%);
  }
  .menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all var(--speed) ease;
  }
  /* .menu-secondary-exit {
} */
  .menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all var(--speed) ease;
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
  box-sizing: content-box;
  position: absolute;
  width: 290px;
  right: 10px;
  background-color: var(--bg);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 0.8rem;
  font-size: 1.25em;
  overflow: hidden;
  z-index: -1;
  /* adjust a bit up later */
  top: calc(var(--nav-size));
  transition: height 300ms;
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

const SubMenuWrapper = styled.div`
  /* we need 'absolute' for the sum-menu transitions to work properly, but because of that
  we have to set width lesser than 100%  */
  position: absolute;
  width: 93%;
`;

const DropdownItem = (props) => (
  <StyledDropdownItem onClick={props.handleClick}>
    {props.leftIcon && <IconButton>{props.leftIcon}</IconButton>}
    {props.children}
    {props.rightIcon && <IconRight>{props.rightIcon}</IconRight>}
  </StyledDropdownItem>
);

const ThemeMenu = ({ backToMain }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <DropdownItem
        leftIcon={<ArrowIcon />}
        handleClick={backToMain}
        rightIcon={' '}
      >
        Toggle Theme
      </DropdownItem>
      {/* <DropdownItem leftIcon={'Toggle Theme'}></DropdownItem> */}
      <DropdownItem>
        <ToggleTheme lightTheme={theme} onClick={() => setTheme(!theme)}>
          <Sun /> <Moon />
        </ToggleTheme>
      </DropdownItem>
    </>
  );
};

const AboutMenu = ({ backToMain }) => (
  <>
    <DropdownItem
      leftIcon={<ArrowIcon />}
      handleClick={backToMain}
      rightIcon={' '}
    ></DropdownItem>
    <DropdownItem>About Menu</DropdownItem>
    <DropdownItem>Description here</DropdownItem>
  </>
);

const SimpleDropdownMenu = ({ currentUser }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const mainRef = useRef(null);
  const themeRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  const backToMain = () => {
    setActiveMenu('main');
  };

  const calcHeight = (node) => {
    console.log(node);
    const height = node.offsetHeight;
    setMenuHeight(height);
  };

  return (
    <StyledDropdownMenu style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        unmountOnExit
        classNames="menu-primary"
        onEnter={() => calcHeight(mainRef.current)}
        nodeRef={mainRef}
      >
        <SubMenuWrapper ref={mainRef}>
          <DropdownItem>
            Logged as: {currentUser && currentUser.email}
          </DropdownItem>
          <DropdownItem
            leftIcon={<BellIcon />}
            setActiveMenu
            rightIcon={' '}
            handleClick={() => navigate(routes.stats)}
          >
            Stats
          </DropdownItem>
          <DropdownItem
            leftIcon={<BoltIcon />}
            rightIcon={<ChevronIcon />}
            handleClick={() => setActiveMenu('theme')}
          >
            Theme
          </DropdownItem>
          <DropdownItem
            leftIcon={<PlusIcon />}
            rightIcon={<ChevronIcon />}
            handleClick={() => setActiveMenu('about')}
          >
            About
          </DropdownItem>
          {/* <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            handleClick={() => setActiveMenu('settings')}
          >
            Settings
          </DropdownItem> */}
        </SubMenuWrapper>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'theme'}
        timeout={500}
        unmountOnExit
        classNames="menu-secondary"
        onEnter={() => calcHeight(themeRef.current)}
        nodeRef={themeRef}
      >
        <SubMenuWrapper ref={themeRef}>
          <ThemeMenu backToMain={backToMain} />
        </SubMenuWrapper>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'about'}
        timeout={500}
        unmountOnExit
        classNames="menu-secondary"
        onEnter={() => calcHeight(aboutRef.current)}
        nodeRef={aboutRef}
      >
        <SubMenuWrapper ref={aboutRef}>
          <AboutMenu backToMain={backToMain} />
        </SubMenuWrapper>
      </CSSTransition>
    </StyledDropdownMenu>
  );
};

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
      v0.7.9.3
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
      <CSSTransition in={open} timeout={400} unmountOnExit classNames="drop">
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