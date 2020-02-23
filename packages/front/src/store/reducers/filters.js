import {
  TOGGLE_FILTER,
} from '../../actions';

const initialState = {
  active: true,
  critical: false,
  done: false,
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      const { key } = action;
      return { ...state, [key]: !state[key] };
    }

    default: {
      return state;
    }
  }
};

export default filtersReducer;
