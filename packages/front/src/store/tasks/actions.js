
import axios from 'axios';
import {
  FETCH_TODAYS_TASKS_REQUEST,
  FETCH_TODAYS_TASKS_SUCCESS,
  FETCH_TODAYS_TASKS_FAILURE,
  UPDATE_TODAYS_TASKS_REQUEST,
  UPDATE_TODAYS_TASKS_SUCCESS,
  UPDATE_TODAYS_TASKS_FAILURE,
} from './action-types';

// ----- Fetch todays tasks -----
const fetchTodaysTasksRequest = () => ({
  type: FETCH_TODAYS_TASKS_REQUEST,
});

const fetchTodaysTasksSuccess = (tasks) => ({
  type: FETCH_TODAYS_TASKS_SUCCESS,
  tasks,
});

const fetchTodaysTasksFailure = (error) => ({
  type: FETCH_TODAYS_TASKS_FAILURE,
  error,
});

const mapTask = ({ __timeboxes__: timeboxes, ...task }) => ({ ...task, timeboxes });

// eslint-disable-next-line import/prefer-default-export
export const fetchTodaysTasks = () => (dispatch) => {
  dispatch(fetchTodaysTasksRequest());
  return axios.get('/api/daily-sheets')
    .then((response) => response.data)
    .then(({ tasks }) => dispatch(fetchTodaysTasksSuccess(tasks.map(mapTask))))
    .catch((error) => dispatch(fetchTodaysTasksFailure(error.message)));
};


// ----- Fetch todays tasks -----
const updateTodaysTasksRequest = () => ({
  type: UPDATE_TODAYS_TASKS_REQUEST,
});

const updateTodaysTasksSuccess = (tasks) => ({
  type: UPDATE_TODAYS_TASKS_SUCCESS,
  tasks,
});

const updateTodaysTasksFailure = (error) => ({
  type: UPDATE_TODAYS_TASKS_FAILURE,
  error,
});

// eslint-disable-next-line import/prefer-default-export
export const updateTodaysTasks = (taskIds) => (dispatch) => {
  dispatch(updateTodaysTasksRequest());
  return axios.post('/api/daily-sheets', { taskIds })
    .then((response) => response.data)
    .then(({ tasks }) => dispatch(updateTodaysTasksSuccess(tasks.map(mapTask))))
    .catch((error) => dispatch(updateTodaysTasksFailure(error.message)));
};
