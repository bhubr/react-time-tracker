import {
  CREATE_WORKSPACE_SUCCESS,
  FETCH_WORKSPACES_SUCCESS,
} from '../workspaces/action-types';

const initialState = {
  current: null,
  items: [],
};

export default function workspacesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_WORKSPACE_SUCCESS:
      return { ...state, items: [...state.items, action.workspace] };

    case FETCH_WORKSPACES_SUCCESS:
      return { ...state, items: action.workspaces };
    default:
      return state;
  }
}
