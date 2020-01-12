import axios from 'axios';
import {
  CREATE_WORKSPACE_REQUEST,
  CREATE_WORKSPACE_SUCCESS,
  CREATE_WORKSPACE_FAILURE,
  FETCH_WORKSPACES_REQUEST,
  FETCH_WORKSPACES_SUCCESS,
  FETCH_WORKSPACES_FAILURE,
} from './action-types';

const createWorkspaceRequest = () => ({
  type: CREATE_WORKSPACE_REQUEST,
});

const createWorkspaceSuccess = (workspace) => ({
  type: CREATE_WORKSPACE_SUCCESS,
  workspace,
});

const createWorkspaceFailure = (error) => ({
  type: CREATE_WORKSPACE_FAILURE,
  error,
});

export const createWorkspace = (payload) => (dispatch) => {
  dispatch(createWorkspaceRequest());
  return axios.post('/api/workspaces', payload)
    .then((response) => response.data)
    .then((workspace) => dispatch(createWorkspaceSuccess(workspace)))
    .catch((error) => dispatch(createWorkspaceFailure(error.message)));
};

// ----- Fetch all tasks -----
const fetchWorkspacesRequest = () => ({
  type: FETCH_WORKSPACES_REQUEST,
});

const fetchWorkspacesSuccess = (workspaces) => ({
  type: FETCH_WORKSPACES_SUCCESS,
  workspaces,
});

const fetchWorkspacesFailure = (error) => ({
  type: FETCH_WORKSPACES_FAILURE,
  error,
});

export const fetchWorkspaces = () => (dispatch) => {
  dispatch(fetchWorkspacesRequest());
  return axios.get('/api/workspaces')
    .then((response) => response.data)
    .then((workspaces) => dispatch(fetchWorkspacesSuccess(workspaces)))
    .catch((error) => dispatch(fetchWorkspacesFailure(error.message)));
};