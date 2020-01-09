import axios from 'axios';
import getNowSeconds from '../helpers/getNowSeconds';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const CREATE_TIME_SLICE_REQUEST = 'CREATE_TIME_SLICE_REQUEST';
export const CREATE_TIME_SLICE_SUCCESS = 'CREATE_TIME_SLICE_SUCCESS';
export const CREATE_TIME_SLICE_FAILURE = 'CREATE_TIME_SLICE_FAILURE';

export const UPDATE_TIME_SLICE_REQUEST = 'UPDATE_TIME_SLICE_REQUEST';
export const UPDATE_TIME_SLICE_SUCCESS = 'UPDATE_TIME_SLICE_SUCCESS';
export const UPDATE_TIME_SLICE_FAILURE = 'UPDATE_TIME_SLICE_FAILURE';

export const TOGGLE_TASK_TITLE_EDITING = 'TOGGLE_TASK_TITLE_EDITING';
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const TOGGLE_POMO_COMMENT_EDITING = 'TOGGLE_POMO_COMMENT_EDITING';

export const TIMER_STARTED = 'TIMER_STARTED';
export const TIMER_STOPPED = 'TIMER_STOPPED';
export const TIMER_TICK = 'TIMER_TICK';
export const BREAK_STARTED = 'BREAK_STARTED';

export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

// Toggle inline task title editing
export const toggleTaskTitleEditing = (id) => ({
  type: TOGGLE_TASK_TITLE_EDITING,
  id,
});

// Toggle inline pomo comment editing
export const togglePomoCommentEditing = (id) => ({
  type: TOGGLE_POMO_COMMENT_EDITING,
  id,
});

// Toggle filter
export const toggleFilter = (key) => ({
  type: TOGGLE_FILTER,
  key,
});

// ----- Create -----
const requestCreateTask = (title) => ({
  type: CREATE_TASK_REQUEST,
  title,
});

const onTaskCreationSuccess = (task) => ({
  type: CREATE_TASK_SUCCESS,
  task,
});

const onTaskCreationFailure = (error) => ({
  type: CREATE_TASK_SUCCESS,
  error,
});

// ----- Update -----
const requestUpdateTask = (task) => ({
  type: UPDATE_TASK_REQUEST,
  task,
});

const onTaskUpdateSuccess = (task) => ({
  type: UPDATE_TASK_SUCCESS,
  task,
});

const onTaskUpdateFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  error,
});

// ----- Delete -----
const requestDeleteTask = (taskId) => ({
  type: DELETE_TASK_REQUEST,
  taskId,
});

const onTaskDeleteSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  taskId,
});

const onTaskDeleteFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  error,
});

// ----- Fetch all tasks -----
const requestFetchTasks = () => ({
  type: FETCH_TASKS_REQUEST,
});

const onTasksFetchSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  tasks,
});

const onTasksFetchFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  error,
});

// ----- Create time slice -----
const requestCreateTimeSlice = (taskId) => ({
  type: CREATE_TIME_SLICE_REQUEST,
  taskId,
});

const onTimeSliceCreationSuccess = (timebox) => ({
  type: CREATE_TIME_SLICE_SUCCESS,
  timebox,
});

const onTimeSliceCreationFailure = (error) => ({
  type: CREATE_TIME_SLICE_FAILURE,
  error,
});

// ----- Update time slice -----
const requestUpdateTimeSlice = (timeboxId) => ({
  type: UPDATE_TIME_SLICE_REQUEST,
  timeboxId,
});

const onTimeSliceUpdateSuccess = (timebox) => ({
  type: UPDATE_TIME_SLICE_SUCCESS,
  timebox,
});

const onTimeSliceUpdateFailure = (error) => ({
  type: UPDATE_TIME_SLICE_FAILURE,
  error,
});

export const createTask = (title) => (dispatch) => {
  dispatch(requestCreateTask(title));
  return axios.post('/api/tasks', { title })
    .then((response) => response.data)
    .then((task) => dispatch(onTaskCreationSuccess(task)))
    .catch((error) => dispatch(onTaskCreationFailure(error)));
};

function setTimeboxesTaskIds(tasks) {
  return tasks.map(
    (task) => ({
      ...task,
      timeboxes: task.timeboxes.map((tb) => ({ ...tb, taskId: task.id })),
    }),
  );
}

export const fetchAllTasks = () => (dispatch) => {
  dispatch(requestFetchTasks());
  return axios.get('/api/tasks')
    .then((response) => response.data)
    .then(setTimeboxesTaskIds)
    .then((tasks) => dispatch(onTasksFetchSuccess(tasks)))
    .catch((error) => dispatch(onTasksFetchFailure(error)));
};

export const updateTask = (task) => (dispatch) => {
  const { id, ...update } = task;
  dispatch(requestUpdateTask(update));
  return axios.put(`/api/tasks/${id}`, update)
    .then((response) => response.data)
    .then((updatedTask) => dispatch(onTaskUpdateSuccess(updatedTask)))
    .catch((error) => dispatch(onTaskUpdateFailure(error)));
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(requestDeleteTask(id));
  return axios.delete(`/api/tasks/${id}`)
    .then((response) => response.data)
    .then(() => dispatch(onTaskDeleteSuccess(id)))
    .catch((error) => dispatch(onTaskDeleteFailure(error)));
};

export const startTimeSlice = (payload) => (dispatch) => {
  dispatch(requestCreateTimeSlice(payload.taskId));
  return axios.post('/api/timeboxes', payload)
    .then((response) => response.data)
    .then((timebox) => dispatch(onTimeSliceCreationSuccess(timebox)))
    .catch((error) => dispatch(onTimeSliceCreationFailure(error)));
};

export const updateTimeSlice = (timeboxId, payload) => (dispatch) => {
  console.log('end time slice', timeboxId, payload);
  dispatch(requestUpdateTimeSlice(timeboxId));
  return axios.put(`/api/timeboxes/${timeboxId}`, payload)
    .then((response) => response.data)
    .then((timebox) => dispatch(onTimeSliceUpdateSuccess(timebox)))
    .catch((error) => dispatch(onTimeSliceUpdateFailure(error)));
};

export const timerStarted = (startedAt, interval) => ({
  type: TIMER_STARTED,
  startedAt,
  interval,
});

export const timerStopped = () => ({
  type: TIMER_STOPPED,
});

export const timerTick = () => ({
  type: TIMER_TICK,
  timestamp: getNowSeconds(),
});

export const startBreak = (startedAt, interval) => ({
  type: BREAK_STARTED,
  startedAt,
  interval,
});

export const setCurrentTask = (taskId) => ({
  type: SET_CURRENT_TASK,
  taskId,
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  reason: error.message,
});

export const login = (credentials) => (dispatch) => {
  dispatch(loginRequest());
  return axios.post('/auth/login', credentials)
    .then((response) => response.data)
    .then((user) => dispatch(loginSuccess(user)))
    .catch((error) => dispatch(loginFailure(error)));
};

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});

export const logout = () => (dispatch) => {
  dispatch(logoutRequest());
  return axios.get('/auth/logout')
    .then(() => dispatch(logoutSuccess()))
    .catch((error) => dispatch(logoutFailure(error)));
};

const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

const fetchProfileSuccess = (user) => ({
  type: FETCH_PROFILE_SUCCESS,
  user,
});

const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  reason: error.message,
});

export const fetchProfile = (credentials) => (dispatch) => {
  dispatch(fetchProfileRequest());
  return axios.get('/profile', credentials)
    .then((response) => response.data)
    .then((user) => dispatch(fetchProfileSuccess(user)))
    .catch((error) => dispatch(fetchProfileFailure(error)));
};
