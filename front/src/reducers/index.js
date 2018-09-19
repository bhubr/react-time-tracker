import { combineReducers } from 'redux'
import tasks from './tasks'
import timer from './timer'

const rootReducer = combineReducers({
  tasks,
  timer
})

export default rootReducer
