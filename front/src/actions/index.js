import axios from 'axios'
import getNowSeconds from '../helpers/getNowSeconds'

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST'
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE'

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST'
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS'
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE'

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST'
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE'

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST'
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE'

export const CREATE_TIME_SLICE_REQUEST = 'CREATE_TIME_SLICE_REQUEST'
export const CREATE_TIME_SLICE_SUCCESS = 'CREATE_TIME_SLICE_SUCCESS'
export const CREATE_TIME_SLICE_FAILURE = 'CREATE_TIME_SLICE_FAILURE'

export const UPDATE_TIME_SLICE_REQUEST = 'UPDATE_TIME_SLICE_REQUEST'
export const UPDATE_TIME_SLICE_SUCCESS = 'UPDATE_TIME_SLICE_SUCCESS'
export const UPDATE_TIME_SLICE_FAILURE = 'UPDATE_TIME_SLICE_FAILURE'

export const TOGGLE_TASK_TITLE_EDITING = 'TOGGLE_TASK_TITLE_EDITING'
export const SET_CURRENT_TASK = 'SET_CURRENT_TASK'

export const TIMER_STARTED = 'TIMER_STARTED'
export const TIMER_STOPPED = 'TIMER_STOPPED'
export const TIMER_TICK = 'TIMER_TICK'
export const BREAK_STARTED = 'BREAK_STARTED'

// Toggle inline task title editing
export const toggleTaskTitleEditing = id => ({
  type: TOGGLE_TASK_TITLE_EDITING,
  id
})

// ----- Create -----
const requestCreateTask = title => ({
  type: CREATE_TASK_REQUEST,
  title
})

const onTaskCreationSuccess = task => ({
  type: CREATE_TASK_SUCCESS,
  task
})

const onTaskCreationFailure = error => ({
  type: CREATE_TASK_SUCCESS,
  error
})

// ----- Update -----
const requestUpdateTask = task => ({
  type: UPDATE_TASK_REQUEST,
  task
})

const onTaskUpdateSuccess = task => ({
  type: UPDATE_TASK_SUCCESS,
  task
})

const onTaskUpdateFailure = error => ({
  type: UPDATE_TASK_FAILURE,
  error
})

// ----- Delete -----
const requestDeleteTask = taskId => ({
  type: DELETE_TASK_REQUEST,
  taskId
})

const onTaskDeleteSuccess = taskId => ({
  type: DELETE_TASK_SUCCESS,
  taskId
})

const onTaskDeleteFailure = error => ({
  type: DELETE_TASK_FAILURE,
  error
})

// ----- Fetch all tasks -----
const requestFetchTasks = () => ({
  type: FETCH_TASKS_REQUEST
})

const onTasksFetchSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  tasks
})

const onTasksFetchFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  error
})

// ----- Create time slice -----
const requestCreateTimeSlice = taskId => ({
  type: CREATE_TIME_SLICE_REQUEST,
  taskId
})

const onTimeSliceCreationSuccess = timeSlice => ({
  type: CREATE_TIME_SLICE_SUCCESS,
  timeSlice
})

const onTimeSliceCreationFailure = error => ({
  type: CREATE_TIME_SLICE_FAILURE,
  error
})

// ----- Update time slice -----
const requestUpdateTimeSlice = timeSliceId => ({
  type: UPDATE_TIME_SLICE_REQUEST,
  timeSliceId
})

const onTimeSliceUpdateSuccess = timeSlice => ({
  type: UPDATE_TIME_SLICE_SUCCESS,
  timeSlice
})

const onTimeSliceUpdateFailure = error => ({
  type: UPDATE_TIME_SLICE_FAILURE,
  error
})

export const createTask = title => dispatch => {
  dispatch(requestCreateTask(title))
  return axios.post('/api/tasks', { title })
  .then(response => response.data)
  .then(task => dispatch(onTaskCreationSuccess(task)))
  .catch(error => dispatch(onTaskCreationFailure(error)))
}

export const fetchAllTasks = () => dispatch => {
  dispatch(requestFetchTasks())
  return axios.get('/api/tasks')
  .then(response => response.data)
  .then(tasks => dispatch(onTasksFetchSuccess(tasks)))
  .catch(error => dispatch(onTasksFetchFailure(error)))
}

export const updateTask = task => dispatch => {
  const taskCopy = { ...task }
  delete taskCopy.id
  dispatch(requestUpdateTask(task))
  return axios.put(`/api/tasks/${task.id}`, taskCopy)
  .then(response => response.data)
  .then(task => dispatch(onTaskUpdateSuccess(task)))
  .catch(error => dispatch(onTaskUpdateFailure(error)))
}

export const deleteTask = taskId => dispatch => {
  dispatch(requestDeleteTask(taskId))
  return axios.delete(`/api/tasks/${taskId}`)
  .then(response => response.data)
  .then(({ taskId }) => dispatch(onTaskDeleteSuccess(taskId)))
  .catch(error => dispatch(onTaskDeleteFailure(error)))
}

export const startTimeSlice = payload => dispatch => {
  dispatch(requestCreateTimeSlice(payload.taskId))
  return axios.post(`/api/time-slices`, payload)
  .then(response => response.data)
  .then(timeSlice => dispatch(onTimeSliceCreationSuccess(timeSlice)))
  .catch(error => dispatch(onTimeSliceCreationFailure(error)))
}

export const endTimeSlice = (timeSliceId, payload) => dispatch => {
  console.log('end time slice', timeSliceId, payload)
  dispatch(requestUpdateTimeSlice(timeSliceId))
  return axios.put(`/api/time-slices/${timeSliceId}`, payload)
  .then(response => response.data)
  .then(timeSlice => dispatch(onTimeSliceUpdateSuccess(timeSlice)))
  .catch(error => dispatch(onTimeSliceUpdateFailure(error)))
}

export const timerStarted = (startedAt, interval) => ({
  type: TIMER_STARTED,
  startedAt,
  interval
})

export const timerStopped = () => ({
  type: TIMER_STOPPED
})

export const timerTick = () => ({
  type: TIMER_TICK,
  timestamp: getNowSeconds()
})

export const startBreak = (startedAt, interval) => ({
  type: BREAK_STARTED,
  startedAt,
  interval
})

export const setCurrentTask = taskId => ({
  type: SET_CURRENT_TASK,
  taskId
})