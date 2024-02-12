import React, { useState, useEffect, Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import logoImage from "../../assets/logo.png";
import {ReactComponent as Hamburger} from '../../assets/hamburger.svg'
import './nav.css';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.ts'
const Navbar: React.FC = ({ isAuthenticated, logout }) => {
  const authLinks: JSX.Element = (
    <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/admin/item-upload'>Admin</NavLink>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick={logout} href='#!'>Logout</a>
            </li>
    </Fragment>
  );
  const guestLinks: JSX.Element = (
    <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>Login</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>Register</NavLink>
            </li>
        </Fragment>
  );
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
                  to='/contact'
                  >
                  Contact
                </NavLink>
              </li>
              { isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { logout })(Navbar);
