import axios from 'axios';
import { Dispatch } from 'redux';
import {
  Society_Signup_Request,
  Society_Signup_Success,
  Society_Signup_Failure,
  Society_Login_Request,
  Society_Login_Success,
  Society_Login_Failure
} from '../actionTypes';

const API_URL = 'http://localhost:5000/';

export const signup = (name: string, email: string, phone: string, pass: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Society_Signup_Request });

  try {
    const result = await axios.post(`${API_URL}society/signup`, { name, email, phone, pass });

    if (!result.data.user) {
      alert(result.data.message);
      return;
    }

    dispatch({
      type: Society_Signup_Success,
      payload: result.data
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now you can access error.message safely
      dispatch({
        type: Society_Signup_Failure,
        error: error.message
      });
    } else {
      // In case the error is not an instance of Error (e.g., network issues), we handle it here.
      dispatch({
        type: Society_Signup_Failure,
        error: 'An unknown error occurred.'
      });
    }
  }
};

export const login = (phone: string, pass: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Society_Login_Request });

  try {
    const result = await axios.post(`${API_URL}society/login`, { phone, pass });

    if (!result.data.user) {
      alert(result.data.message);
      return;
    }

    dispatch({
      type: Society_Login_Success,
      payload: result.data
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now you can access error.message safely
      dispatch({
        type: Society_Login_Failure,
        error: error.message
      });
    } else {
      // Handle unexpected errors
      dispatch({
        type: Society_Login_Failure,
        error: 'An unknown error occurred.'
      });
    }
  }
};
