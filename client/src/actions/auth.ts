import axios from 'axios';
import Cookies from 'js-cookie';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from './types.ts';

export const checkAuthenticated = () => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/authenticated/`, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.data.isAuthenticated === 'success') {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    }
  } catch (error) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
  }
};

export const register = (username, password, re_password, internal_pass) => async (dispatch) => {
  const body = JSON.stringify({ username, password, re_password, internal_pass });
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register/`, body, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });

    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const body = { username, password };
  try {
    console.log(Cookies.get('csrftoken'))
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login/`, body, {
      withCredentials:true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });

    if (response.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  const body = JSON.stringify({
    withCredentials: true,
    credentials: 'include',
  });

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/logout/`, body, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });

    if (response.data.success) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

export const delete_account = () => async (dispatch) => {
  const body = JSON.stringify({
    withCredentials: true,
    credentials: 'include',
  });

  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/accounts/delete/`, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      data: body, // Include data for DELETE requests
    });

    if (response.data.success) {
      dispatch({
        type: DELETE_USER_SUCCESS,
      });
    } else {
      dispatch({
        type: DELETE_USER_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
    });
  }
};
