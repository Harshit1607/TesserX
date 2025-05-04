import {
  Society_Signup_Request,
  Society_Signup_Success,
  Society_Signup_Failure,
  Society_Login_Request,
  Society_Login_Success,
  Society_Login_Failure
} from '../actionTypes';

interface SocietyState {
  society: any;
  loading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
  error?: string;
}

const initialState: SocietyState = {
  society: null,
  loading: false,
  error: null,
};

function societyAuthReducer(state = initialState, action: Action): SocietyState {
  switch (action.type) {
    case Society_Signup_Request:
    case Society_Login_Request:
      return { ...state, loading: true, error: null };

    case Society_Signup_Success:
    case Society_Login_Success:
      return { ...state, loading: false, society: action.payload };

    case Society_Signup_Failure:
    case Society_Login_Failure:
      return { ...state, loading: false, error: action.error || 'Something went wrong' };

    default:
      return state;
  }
}

export default societyAuthReducer;
