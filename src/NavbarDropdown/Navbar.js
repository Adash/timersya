import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as routes from '../constants/routes';

import styled from 'styled-components';
import 'styled-components/macro';
import { CSSTransition } from 'react-transition-group';

import Logo from './Logo';
import ToggleTheme from '../components/Buttons/ThemeToggle';
import Cookies from 'js-cookie';

import { AuthContext, FirebaseContext } from '../firebase/context';
import { ThemeContext } from '../App/App';

import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as Sun } from './icons/sun.svg';
import { ReactComponent as Moon } from './icons/moon.svg';
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

export const StyledNavItem = styled.li`
  width: calc(var(--nav-size) * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.span`
  background-color: var(--bg-accent);
  border-radius: 4px 4px 4px 4px;
  padding: 5px;
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

const DropdownTextArea = styled.div`
  background-color: transparent;
  color: var(--text-color);
  width: 100%;
  margin: 0;
  padding: 5px;
`;

const SubMenuWrapper = styled.div`
  /* we need 'absolute' for the sum-menu transitions to work properly, but because of that
  we have to set width lesser than 100%  */
  position: absolute;
  width: 93%;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 28px;
  color: white;
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
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'default' : 'dark';
    Cookies.set('timersya-theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <>
      <DropdownItem
        leftIcon={<ArrowIcon />}
        handleClick={backToMain}
        rightIcon={' '}
      >
        Toggle Theme
      </DropdownItem>
      <DropdownTextArea>
        <ToggleTheme themeState={theme} onClick={toggleTheme}>
          <Sun /> <Moon />
        </ToggleTheme>
      </DropdownTextArea>
    </>
  );
};

const AboutMenu = ({ backToMain }) => (
  <>
    <DropdownItem
      leftIcon={<ArrowIcon />}
      handleClick={backToMain}
      rightIcon={' '}
    >
      About
    </DropdownItem>
    <DropdownTextArea>Made by Adam Kusber</DropdownTextArea>
    <DropdownTextArea>
      Icons made by{' '}
      <a
        href="https://www.flaticon.com/authors/smalllikeart"
        title="smalllikeart"
      >
        smalllikeart
      </a>
    </DropdownTextArea>
  </>
);

const DropdownToggler = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  return (
    <StyledNavItem ref={wrapperRef}>
      <IconButton href="#" onClick={() => setOpen(!open)}>
        <CaretIcon />
      </IconButton>
      <CSSTransition in={open} timeout={400} unmountOnExit classNames="drop">
        <SimpleDropdownMenu
          setOpen={setOpen}
          wrapperRef={wrapperRef}
          currentUser={currentUser}
        />
      </CSSTransition>
    </StyledNavItem>
  );
};

const SimpleDropdownMenu = ({ currentUser, setOpen, wrapperRef }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const mainRef = useRef(null);
  const themeRef = useRef(null);
  const aboutRef = useRef(null);
  const { signOut } = useContext(FirebaseContext);
  let navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, setOpen]);

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
          <DropdownTextArea>
            Logged as: {currentUser && currentUser.email}
          </DropdownTextArea>
          <DropdownItem
            leftIcon={<MessengerIcon />}
            setActiveMenu
            rightIcon={' '}
            handleClick={() => {
              setOpen(false);
              navigate(routes.home);
            }}
          >
            Home
          </DropdownItem>
          <DropdownItem
            leftIcon={<BoltIcon />}
            setActiveMenu
            rightIcon={' '}
            handleClick={() => {
              setOpen(false);
              navigate(routes.timer);
            }}
          >
            Timer
          </DropdownItem>
          <DropdownItem
            leftIcon={<BellIcon />}
            setActiveMenu
            rightIcon={' '}
            handleClick={() => {
              setOpen(false);
              navigate(routes.stats);
            }}
          >
            Stats
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
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
          <DropdownItem
            leftIcon={<ArrowIcon />}
            rightIcon={' '}
            handleClick={signOut}
          >
            Sign out
          </DropdownItem>
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

const NavPlaceholder = () => (
  <div
    css={`
      width: 31.2px;
    `}
  >
    {/* this is here to force proper alignment with flexbox
          it's really a hack to be fixed it in the future
          */}
  </div>
);

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <StackingContext>
      <StyledNav>
        <BackButton onClick={() => navigate(-1)}>←</BackButton>
        <Logo />
        {/* the StyledUl is here in order to allow more menu icons for desktop view */}
        <StyledUl>
          {currentUser ? (
            <DropdownToggler currentUser={currentUser} />
          ) : (
            <NavPlaceholder />
          )}
        </StyledUl>
      </StyledNav>
    </StackingContext>
  );
};

export default Navbar;
