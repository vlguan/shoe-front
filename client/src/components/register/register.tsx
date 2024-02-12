import React, { useState, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth.ts';
import CSRFToken from '../../actions/CSRFToken.js';
import '../login/login.css'
const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: '',
    internal_pass:''
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const { username, password, re_password, internal_pass } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password === re_password) {
      register(username, password, re_password, internal_pass);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    console.log('got authed');
    return <Navigate to='/admin' />;
  } else if (accountCreated) return <Navigate to='/login' />;

  return (
    <div className='login-container mt-5'>
      <h1>Register for an Account</h1>
      <p>Create an account with our Session Auth application</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <CSRFToken />
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
            minLength={6}
            required
          />
        </div>
        <div className='login-form-group'>
          <label className='login-form-label mt-3'>Confirm Password: </label>
          <input
            className='login-form-control'
            type='password'
            placeholder='Confirm Password*'
            name='re_password'
            onChange={(e) => onChange(e)}
            value={re_password}
            minLength={6}
            required
          />
        </div>
        <div className='login-form-group'>
          <label className='login-form-label mt-3'>Internal Password: </label>
          <input
            className='login-form-control'
            type='password'
            placeholder='Internal Password*'
            name='internal_pass'
            onChange={(e) => onChange(e)}
            value={internal_pass}
            required
          />
        </div>
        <button className='login-btn-primary mt-3' type='submit'>
          Register
        </button>
      </form>
      <p className='login-mt-3'>
        Already have an Account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
