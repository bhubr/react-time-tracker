import {
  CREATE_TIME_SLICE_REQUEST,
  CREATE_TIME_SLICE_SUCCESS,
  CREATE_TIME_SLICE_FAILURE,
  TIMER_STARTED,
  TIMER_STOPPED,
  TIMER_TICK,
  BREAK_STARTED,
} from '../actions';

import {
  TIMER_IDLE,
  TIMER_POMODORO,
  TIMER_SHORT_BREAK,
  TIMER_LONG_BREAK,
} from '../constants';

const DURATION = 25 * 60;
const SB = 5 * 60;
const LB = 15 * 60;

const initialState = {
  autoStart: true,
  loading: false,
  status: TIMER_IDLE,
  interval: null,
  remaining: 0,
  startedAt: 0,
  taskId: 0,
  timeSliceId: 0,
  consecutivePomos: 0,
  duration: 0,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TIME_SLICE_REQUEST: {
      return { ...state, startedAt: 0, loading: true };
    }

    case CREATE_TIME_SLICE_SUCCESS: {
      const { taskId, id } = action.timeSlice;
      return {
        ...state, taskId, timeSliceId: id, status: TIMER_POMODORO, loading: false,
      };
    }

    case CREATE_TIME_SLICE_FAILURE: {
      const { error } = action;
      console.log('error', error);
      return { ...state, loading: false };
    }

    case TIMER_STARTED: {
      const { startedAt, interval } = action;
      return {
        ...state, startedAt, interval, remaining: DURATION, duration: DURATION,
      };
    }

    case BREAK_STARTED: {
      const { startedAt, interval } = action;
      let { consecutivePomos } = state;
      consecutivePomos += 1;
      const isLongBreak = consecutivePomos === 4;
      let duration;
      let status;
      if (isLongBreak) {
        status = TIMER_LONG_BREAK;
        duration = LB;
      } else {
        status = TIMER_SHORT_BREAK;
        duration = SB;
      }
      const remaining = duration;
      consecutivePomos %= 4;
      return {
        ...state, startedAt, interval, remaining, consecutivePomos, duration, status,
      };
    }

    case TIMER_STOPPED: {
      let { consecutivePomos } = state;
      if (state.status === TIMER_POMODORO) {
        consecutivePomos = (consecutivePomos + 1) % 4;
      }
      return {
        ...state,
        startedAt: 0,
        interval: null,
        remaining: 0,
        status: TIMER_IDLE,
        taskId: 0,
        timeSliceId: 0,
        consecutivePomos,
      };
    }

    case TIMER_TICK: {
      const { timestamp } = action;
      const { duration } = state;
      const remaining = duration - (timestamp - state.startedAt);
      return { ...state, remaining };
    }

    default: {
      return state;
    }
  }
};
export default timerReducer;
