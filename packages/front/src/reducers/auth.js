import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions';

const initialState = {
  user: null,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { user } = action;
      return { ...state, user, error: '' };
    }

    case LOGIN_FAILURE: {
      const { reason } = action;
      return { ...state, error: reason };
    }

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
