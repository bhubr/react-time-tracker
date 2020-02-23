import {
  CREATE_PROJECT_SUCCESS,
  FETCH_PROJECTS_SUCCESS,
} from '../projects/action-types';

const initialState = {
  current: null,
  items: [],
};

export default function workspacesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
      return { ...state, items: [...state.items, action.workspace] };

    case FETCH_PROJECTS_SUCCESS:
      return { ...state, items: action.workspaces };
    default:
      return state;
  }
}
