import {
  MATCH_SPONSORS_REQUEST,
  MATCH_SPONSORS_SUCCESS,
  MATCH_SPONSORS_FAILURE,
  FETCH_PROPOSAL_REQUEST,
  FETCH_PROPOSAL_SUCCESS,
  FETCH_PROPOSAL_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE
} from '../actionTypes';

interface SocietyHomeState {
  matches: any[];
  proposal: string | null;
  profile: any;
  loading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
  error?: string;
}

const initialState: SocietyHomeState = {
  matches: [],
  proposal: null,
  profile: null,
  loading: false,
  error: null,
};

function societyHomeReducer(state = initialState, action: Action): SocietyHomeState {
  switch (action.type) {
    case MATCH_SPONSORS_REQUEST:
    case FETCH_PROPOSAL_REQUEST:
    case FETCH_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case MATCH_SPONSORS_SUCCESS:
      return { ...state, loading: false, matches: action.payload };

    case FETCH_PROPOSAL_SUCCESS:
      return { ...state, loading: false, proposal: action.payload };

    case FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };

    case MATCH_SPONSORS_FAILURE:
    case FETCH_PROPOSAL_FAILURE:
    case FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.error || 'Something went wrong' };

    default:
      return state;
  }
}

export default societyHomeReducer;
