import { combineReducers } from 'redux';
import auth from './auth';
import filters from './filters';
import tasks from './tasks';
import projects from '../store/projects/reducer';
import workspaces from './workspaces';
import timer from './timer';

const rootReducer = combineReducers({
  auth,
  filters,
  tasks,
  projects,
  workspaces,
  timer,
});

export default rootReducer;
