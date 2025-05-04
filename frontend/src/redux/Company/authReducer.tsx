import {
  Company_Signup_Request,
  Company_Signup_Success,
  Company_Signup_Failure,
  Company_Login_Request,
  Company_Login_Success,
  Company_Login_Failure
} from '../actionTypes';

interface CompanyState {
  company: any;
  loading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
  error?: string;
}

const initialState: CompanyState = {
  company: null,
  loading: false,
  error: null,
};

function companyAuthReducer(state = initialState, action: Action): CompanyState {
  switch (action.type) {
    case Company_Signup_Request:
    case Company_Login_Request:
      return { ...state, loading: true, error: null };

    case Company_Signup_Success:
    case Company_Login_Success:
      return { ...state, loading: false, company: action.payload };

    case Company_Signup_Failure:
    case Company_Login_Failure:
      return { ...state, loading: false, error: action.error || 'Something went wrong' };

    default:
      return state;
  }
}

export default companyAuthReducer;
