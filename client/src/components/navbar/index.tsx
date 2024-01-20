import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import logoImage from "../../assets/logo.png";
import {ReactComponent as Hamburger} from '../../assets/hamburger.svg'
import './nav.css';

const Navbar: React.FC = () => {
  const [showNav, setShowNav] = useState(false)
  const toggleNavItems = () => {
    setShowNav(!showNav)
  }

  return (
      <nav className='navbar'>
        <div className="logo">
            <img src={logoImage} className='logo-img' alt='Logo'/>
            <NavLink to='/' className='navbar-logo'>
                Little Feet
              </NavLink>
          </div>
        <div className='container'>
          <div className='menu-icon' onClick={toggleNavItems}>
              <Hamburger/>
            </div>
          <div className={`nav-elements ${showNav && 'active'}`}>
            <ul>
              <li>
                <NavLink
                  to='/gallery'
                  
                  >
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/howto'
                  
                >
                  How To
                </NavLink>
              </li>
              <li>
                <NavLink to='/blog' >
                  Blog
                </NavLink>
              </li>
              <li>
              <NavLink
                  to='/instagram'
                  
                >
                  Instagram
                </NavLink>
              </li>
              <li>
              <NavLink
                  to='/admin'
                  
                >
                  Admin
                </NavLink>
              </li>
              <li>
              <NavLink
                  to='/contact'
                  >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
