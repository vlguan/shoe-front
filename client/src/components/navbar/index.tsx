import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "../dropdown/dropdown.tsx";

import './nav.css';

const Navbar: React.FC = () => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => {
    setClick(!click);
    // Show dropdown only when the window is in phone format
    if (window.innerWidth < 960) {
      setDropdown(!dropdown);
    }
  };

  const closeMobileMenu = () => {
    setClick(false);
    setDropdown(false);
  };

  useEffect(() => {
    // Attach the event listener for window resize
    window.addEventListener('resize', closeMobileMenu);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', closeMobileMenu);
    };
  }, []);

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Your Logo
          <i className='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/gallery'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Gallery <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/howto'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              How To Purchase
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/blog' className='nav-links' onClick={closeMobileMenu}>
              Blog
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/instagram'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Instagram
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
