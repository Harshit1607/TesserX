import axios from 'axios';
import { Dispatch } from 'redux';
import {
  Company_Signup_Request,
  Company_Signup_Success,
  Company_Signup_Failure,
  Company_Login_Request,
  Company_Login_Success,
  Company_Login_Failure
} from '../actionTypes';

const API_URL = 'http://localhost:5000/';

export const signup = (name: string, email: string, phone: string, pass: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Company_Signup_Request });

  try {
    const result = await axios.post(`${API_URL}company/signup`, { name, email, phone, pass });

    if (!result.data.user) {
      alert(result.data.message);
      return;
    }

    dispatch({
      type: Company_Signup_Success,
      payload: result.data
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now you can access error.message safely
      dispatch({
        type: Company_Signup_Failure,
        error: error.message
      });
    } else {
      // In case the error is not an instance of Error (e.g., network issues), we handle it here.
      dispatch({
        type: Company_Signup_Failure,
        error: 'An unknown error occurred.'
      });
    }
  }
};

export const login = (phone: string, pass: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Company_Login_Request });

  try {
    const result = await axios.post(`${API_URL}company/login`, { phone, pass });

    if (!result.data.user) {
      alert(result.data.message);
      return;
    }

    dispatch({
      type: Company_Login_Success,
      payload: result.data
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now you can access error.message safely
      dispatch({
        type: Company_Login_Failure,
        error: error.message
      });
    } else {
      // Handle unexpected errors
      dispatch({
        type: Company_Login_Failure,
        error: 'An unknown error occurred.'
      });
    }
  }
};
