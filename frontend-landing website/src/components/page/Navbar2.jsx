import "@/css/Navbar.css";
import React from 'react';
import {
  // Collapse,
  Navbar,
  Nav,
  NavItem,
  // NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from 'reactstrap';
import { NavLink } from "react-router-dom";

const Navbar2 = () => {
  return (
    <Navbar dark expand="md" className="nav-bar nav-below">
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-items">Home</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink to="/components/Resources" className="nav-items">Resources</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink to="/components/Overview" className="nav-items">Overview</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink to="/components/Contact" className="nav-items">Contact us</NavLink>
            </NavItem> */}
          </Nav>
      </Navbar>
  )
}

export default Navbar2
