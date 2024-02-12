// Login.jsx

import React, { useState } from 'react';
import './login.css';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth.ts';
import CSRFToken from '../../actions/CSRFToken.js';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const[loginError, setLoginError] = useState('');

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async(e) => {
    e.preventDefault();
    await login(username, password)
    if (!isAuthenticated){
      setLoginError('Invalid credentials. Please try again.');
    }
  };
  const clearLoginError=()=>{
    setLoginError('');
  }
  if (isAuthenticated) {
    console.log('got authed');
    return <Navigate to='/admin/item-upload' />;
  }

  return (
    <div className='login-container mt-5'>
      <CSRFToken/>
      <h1>Sign In</h1>
      <p>Sign into your Session Auth account</p>
      {loginError && <p className='login-error'>{loginError}</p>} {/* Display login fail message */}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='login-form-group'>
          <label className='login-form-label'>Username: </label>
          <input
            className='login-form-control'
            type='text'
            placeholder='Username*'
            name='username'
            onChange={(e) => onChange(e)}
            value={username}
            required
          />
        </div>
        <div className='login-form-group'>
          <label className='login-form-label mt-3'>Password: </label>
          <input
            className='login-form-control'
            type='password'
            placeholder='Password*'
            name='password'
            onChange={(e) => onChange(e)}
            value={password}
            required
          />
        </div>
        <button className='login-btn-primary mt-3' type='submit' onClick={clearLoginError}>
          Login
        </button>
      </form>
      <p className='login-mt-3'>
        Don't have an Account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps, { login })(Login);
