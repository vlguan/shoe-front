import React, { useState, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../../assets/hamburger.svg';
import './adminNav.css';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.ts';

const AdminNavbar = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return null; // Do not render the navbar if not authenticated
  }

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/admin/item-upload'>Item Upload</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/admin/blog-upload'>Blog Upload</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/admin/howto-edit'>HowTo Edit</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' to='/admin/item-edit'>Item Edit</NavLink>
      </li>
    </Fragment>
  );


  return (
    <nav className='adminnavbar'>
      <div className='anav-container'>
        </div>
        <div className={`anav-elements`}>
          <ul>
            {isAuthenticated && authLinks}
          </ul>
        </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(AdminNavbar);
