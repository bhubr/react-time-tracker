import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  TOGGLE_TASK_TITLE_EDITING,
  SET_CURRENT_TASK,
  CREATE_TIME_SLICE_SUCCESS
} from '../actions'


const initialState = {
  inlineEditing: 0,
  items: [],
  loading: false,
  currentTaskId: 0
}

const tasksReducer = (state = initialState, action) => {
  switch(action.type) {

    // Tasks fetching related
    case FETCH_TASKS_REQUEST: {
      return { ...state, loading: true }
    }
    case FETCH_TASKS_SUCCESS: {
      const { tasks } = action
      return { items: tasks, loading: false }
    }
    case FETCH_TASKS_FAILURE: {
      return { ...state, loading: false }
    }

    // Task creation related
    case CREATE_TASK_REQUEST: {
      return { ...state, loading: true }
    }
    case CREATE_TASK_SUCCESS: {
      const { task } = action
      const items = [...state.items, task]
      return { items, loading: false }
    }
    case CREATE_TASK_FAILURE: {
      return { ...state, loading: false }
    }

    // Task update related
    case UPDATE_TASK_REQUEST: {
      return { ...state, loading: true }
    }
    case UPDATE_TASK_SUCCESS: {
      const { task } = action
      const items = state.items.map(
        item => item.id === task.id ? { ...task } : { ...item }
      )
      return { items, loading: false }
    }
    case UPDATE_TASK_FAILURE: {
      return { ...state, loading: false }
    }

    // Toggle task title inline editing
    case TOGGLE_TASK_TITLE_EDITING: {
      const { inlineEditing } = state
      if (! inlineEditing || inlineEditing !== action.id) {
        return { ...state, inlineEditing: action.id }
      }
      return { ...state, inlineEditing: 0 }
    }

    // When timer is started, set current task id
    case CREATE_TIME_SLICE_SUCCESS: {
      const { taskId } = action.timeSlice
      return { ...state, currentTaskId: taskId }
    }
    case SET_CURRENT_TASK: {
      const { taskId } = action
      return { ...state, currentTaskId: taskId }
    }
      
    default: {
      return state
    }
  }
}
export default tasksReducer
