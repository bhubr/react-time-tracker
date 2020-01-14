import axios from 'axios';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  IMPORT_PROJECTS_REQUEST,
  IMPORT_PROJECTS_SUCCESS,
  IMPORT_PROJECTS_FAILURE,
} from './action-types';
import listBitbucketAPI from '../../helpers/listBitbucketAPI';

// eslint-disable-next-line import/prefer-default-export
export function createProject(payload) {
  return {
    // Types of actions to emit before and after
    types: [CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE],
    // Perform the fetching:
    callAPI: () => axios.post('/api/projects', payload),
    // Arguments to inject in begin/end actions
    payload,
  };
}
// eslint-disable-next-line import/prefer-default-export
export function importProjects(login, accessToken) {
  const authorization = `Bearer ${accessToken}`;
  return {
    // Types of actions to emit before and after
    types: [IMPORT_PROJECTS_REQUEST, IMPORT_PROJECTS_SUCCESS, IMPORT_PROJECTS_FAILURE],
    // Perform the fetching:
    callAPI: () => listBitbucketAPI(
      `https://api.bitbucket.org/2.0/repositories/${login}`,
      { authorization },
    ),
  };
}
