import React from 'react';
import { StyledNavItem, IconButton } from './Navbar';

// Use when you need more buttons in different desktop view
const NavItem = ({ icon }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledNavItem>
      <IconButton href="#" onClick={() => setOpen(!open)}>
        {icon}
      </IconButton>
    </StyledNavItem>
  );
};

export default NavItem;
