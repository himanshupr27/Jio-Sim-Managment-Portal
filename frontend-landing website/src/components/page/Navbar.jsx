import "@/css/Navbar.css";
import React, { useState } from 'react';
import { FaSearch,FaMicrophone,FaHeart,FaUserCircle } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
} from 'reactstrap';
import { NavLink } from "react-router-dom";

const Navbartop = () => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar dark expand="md" className="nav-bar">
        <NavbarBrand href="/"><img id="nav-icon" src="/Images/Nabvar/jio-icon.png"/></NavbarBrand>
        <NavbarToggler onClick={toggle} >
          {/* <FaUserCircle className="outer-search-icon" id="user-img"/>  */}
          </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {/* <NavItem >
              <NavLink to="/components/mobile" className="nav-items">Mobile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/components/True 5G" className="nav-items">True 5G</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/components/JioFiber" className="nav-items">JioFiber</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/components/AirFiber" className="nav-items">AirFiber</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink to="/" className="nav-items active">Home</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink to="/components/Devices" className="nav-items">Devices</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/components/Apps" className="nav-items">Apps</NavLink>
            </NavItem> */}
          </Nav>


          <Navbar className="nav-bar-left">

            <div className="searchbar">
            <FaSearch id="search-icon"/>
            <input type="text" placeholder="Search"/>
            <FaMicrophone/>
            </div>

          <FaHeart className="outer-search-icon"/>
          <MdShowChart className="outer-search-icon"/>
          <NavLink to="/bussiness/user/login">
          <FaUserCircle className="outer-search-icon" id="user-img"/>
          </NavLink>
          </Navbar>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default Navbartop
