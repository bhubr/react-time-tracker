import axios from 'axios';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
} from './action-types';

const createProjectRequest = () => ({
  type: CREATE_PROJECT_REQUEST,
});

const createProjectSuccess = (workspace) => ({
  type: CREATE_PROJECT_SUCCESS,
  workspace,
});

const createProjectFailure = (error) => ({
  type: CREATE_PROJECT_FAILURE,
  error,
});

export const createProject = (payload) => (dispatch) => {
  dispatch(createProjectRequest());
  return axios.post('/api/projects', payload)
    .then((response) => response.data)
    .then((workspace) => dispatch(createProjectSuccess(workspace)))
    .catch((error) => dispatch(createProjectFailure(error.message)));
};

// ----- Fetch all tasks -----
const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST,
});

const fetchProjectsSuccess = (workspaces) => ({
  type: FETCH_PROJECTS_SUCCESS,
  workspaces,
});

const fetchProjectsFailure = (error) => ({
  type: FETCH_PROJECTS_FAILURE,
  error,
});

export const fetchProjects = () => (dispatch) => {
  dispatch(fetchProjectsRequest());
  return axios.get('/api/projects')
    .then((response) => response.data)
    .then((workspaces) => dispatch(fetchProjectsSuccess(workspaces)))
    .catch((error) => dispatch(fetchProjectsFailure(error.message)));
};