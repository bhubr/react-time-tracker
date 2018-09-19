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

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST'
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE'

export const TOGGLE_TASK_TITLE_EDITING = 'TOGGLE_TASK_TITLE_EDITING'

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

// ----- Fetch all -----
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

export const toggleTaskTitleEditing = id => ({
  type: TOGGLE_TASK_TITLE_EDITING,
  id
})