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
  TOGGLE_POMO_COMMENT_EDITING,
  SET_CURRENT_TASK,
  CREATE_TIME_SLICE_SUCCESS,
  UPDATE_TIME_SLICE_SUCCESS,
  DELETE_TASK_SUCCESS,
} from '../../actions';
import {
  FETCH_TODAYS_TASKS_SUCCESS,
} from '../tasks/action-types';

const initialState = {
  inlineTaskEditing: 0,
  inlinePomoEditing: 0,
  items: [],
  todaysItems: [],
  loading: false,
  currentTaskId: 0,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    // Tasks fetching related
    case FETCH_TASKS_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_TODAYS_TASKS_SUCCESS: {
      const { tasks } = action;
      return { ...state, todaysItems: tasks, loading: false };
    }
    case FETCH_TASKS_SUCCESS: {
      const { tasks } = action;
      return { ...state, items: tasks, loading: false };
    }
    case FETCH_TASKS_FAILURE: {
      return { ...state, loading: false };
    }

    // Task creation related
    case CREATE_TASK_REQUEST: {
      return { ...state, loading: true };
    }
    case CREATE_TASK_SUCCESS: {
      const { task } = action;
      const items = [...state.items, task];
      return { ...state, items, loading: false };
    }
    case CREATE_TASK_FAILURE: {
      return { ...state, loading: false };
    }

    // Task update related
    case UPDATE_TASK_REQUEST: {
      return { ...state, loading: true };
    }
    case UPDATE_TASK_SUCCESS: {
      const { task } = action;
      const items = state.items.map(
        (item) => (item.id === task.id ? { ...task } : { ...item }),
      );
      return { items, loading: false };
    }
    case UPDATE_TASK_FAILURE: {
      return { ...state, loading: false };
    }

    case DELETE_TASK_SUCCESS: {
      const { taskId: deletedTaskId } = action;
      return {
        ...state,
        items: state.items.filter((task) => task.id !== deletedTaskId),
      };
    }

    // Toggle task title inline editing
    case TOGGLE_TASK_TITLE_EDITING: {
      const { inlineTaskEditing } = state;
      if (!inlineTaskEditing || inlineTaskEditing !== action.id) {
        return { ...state, inlineTaskEditing: action.id };
      }
      return { ...state, inlineTaskEditing: 0 };
    }

    // Toggle task title inline editing
    case TOGGLE_POMO_COMMENT_EDITING: {
      const { inlinePomoEditing } = state;
      if (!inlinePomoEditing || inlinePomoEditing !== action.id) {
        return { ...state, inlinePomoEditing: action.id };
      }
      return { ...state, inlinePomoEditing: 0 };
    }

    // When timer is started, set current task id, add time slice to task's slices
    case CREATE_TIME_SLICE_SUCCESS: {
      const { timebox } = action;
      const newTask = state.todaysItems.find((task) => task.id === timebox.taskId);
      const timeboxes = newTask.timeboxes.map((ts) => ({ ...ts })).concat([{ ...timebox }]);
      const todaysItems = state.todaysItems.map(
        (item) => (item.id === newTask.id ? { ...newTask, timeboxes } : { ...item }),
      );
      return { ...state, todaysItems, currentTaskId: timebox.taskId };
    }
    case UPDATE_TIME_SLICE_SUCCESS: {
      const { timebox } = action;
      const updatedTask = state.todaysItems.find((task) => task.id === timebox.taskId);
      const timeboxes = updatedTask.timeboxes.map(
        (ts) => (ts.id === timebox.id ? { ...timebox } : { ...ts }),
      );
      const todaysItems = state.todaysItems.map(
        (item) => (item.id === updatedTask.id ? { ...updatedTask, timeboxes } : { ...item }),
      );
      return { ...state, todaysItems };
    }
    case SET_CURRENT_TASK: {
      const { taskId } = action;
      return { ...state, currentTaskId: taskId };
    }

    default: {
      return state;
    }
  }
};
export default tasksReducer;
