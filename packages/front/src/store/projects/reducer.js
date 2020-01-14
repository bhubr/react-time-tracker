import {
  CREATE_PROJECT_SUCCESS,
  FETCH_PROJECTS_SUCCESS,
  IMPORT_PROJECTS_SUCCESS,
} from './action-types';

const initialState = {
  current: null,
  items: [],
  importableRepos: [],
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
      return { ...state, items: [...state.items, action.response] };

    case FETCH_PROJECTS_SUCCESS:
      return { ...state, items: action.response };

    case IMPORT_PROJECTS_SUCCESS:
      console.log(action);
      return { ...state, importableRepos: action.response };
    default:
      return state;
  }
}
