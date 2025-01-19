import "@/css/Navbar.css";
import React from 'react';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Navbar2 = () => {
  return (
    <Navbar dark expand="md" className="nav-bar nav-below">
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/mobile" className="nav-items">Discover</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/True 5G" className="nav-items">Plans</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/JioFiber" className="nav-items">Services</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="dropdowntoggel">
                Segments
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Option 2</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/components/Business" className="nav-items">Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/Devices" className="nav-items">Contact us</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
  )
}

export default Navbar2
