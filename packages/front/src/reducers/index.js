import { combineReducers } from 'redux';
import auth from './auth';
import filters from './filters';
import tasks from './tasks';
import timer from './timer';

const rootReducer = combineReducers({
  auth,
  filters,
  tasks,
  timer,
});

export default rootReducer;
