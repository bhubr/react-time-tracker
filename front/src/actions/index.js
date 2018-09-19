import axios from 'axios'

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST'
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE'

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST'
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS'
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE'

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST'
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE'

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
