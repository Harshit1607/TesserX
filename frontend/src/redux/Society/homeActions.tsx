import axios from 'axios';
import {
  MATCH_SPONSORS_REQUEST,
  MATCH_SPONSORS_SUCCESS,
  MATCH_SPONSORS_FAILURE,
  FETCH_PROPOSAL_REQUEST,
  FETCH_PROPOSAL_SUCCESS,
  FETCH_PROPOSAL_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../actionTypes';

const API_URL = 'http://localhost:5000/society'; // Adjust base URL if needed

export const matchSponsors = (filters: any) => async (dispatch: any) => {
  try {
    dispatch({ type: MATCH_SPONSORS_REQUEST });
    const { data } = await axios.post(`${API_URL}/`, filters);
    dispatch({ type: MATCH_SPONSORS_SUCCESS, payload: data.matches });
  } catch (error: any) {
    dispatch({ type: MATCH_SPONSORS_FAILURE, error: error.response?.data?.error || 'Something went wrong' });
  }
};

export const fetchProposal = (companyId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_PROPOSAL_REQUEST });
    const { data } = await axios.post(`${API_URL}/proposal`, { companyId });
    dispatch({ type: FETCH_PROPOSAL_SUCCESS, payload: data.proposal });
  } catch (error: any) {
    dispatch({ type: FETCH_PROPOSAL_FAILURE, error: error.response?.data?.error || 'Something went wrong' });
  }
};

export const fetchProfile = (societyId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_PROFILE_REQUEST });
    const { data } = await axios.post(`${API_URL}/profile`, { societyId });
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: data.company }); // Typo in backend, company is actually society
  } catch (error: any) {
    dispatch({ type: FETCH_PROFILE_FAILURE, error: error.response?.data?.error || 'Something went wrong' });
  }
};
