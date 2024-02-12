import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth.ts';

const AdminDashboard = ({ checkAuthenticated, isAuthenticated }) => {

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);
  if (!isAuthenticated){
    return <Navigate to='/login'/>;
  }
  return (
    <>
    {/* <AdminNav/> */}
    <Outlet/>
    </>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated })(AdminDashboard);
