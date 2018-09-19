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
} from '../actions'


const initialState = {
  items: [],
  loading: false
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


      
    default: {
      return state
    }
  }
}
export default tasksReducer
