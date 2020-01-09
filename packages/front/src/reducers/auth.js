import {
  LOGIN_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from '../actions';

const initialState = {
  user: null,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
    case LOGIN_SUCCESS: {
      const { user } = action;
      return { ...state, user, error: '' };
    }

    case LOGIN_FAILURE: {
      const { reason } = action;
      return { ...state, error: reason };
    }

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
