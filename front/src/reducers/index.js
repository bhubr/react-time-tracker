import { combineReducers } from 'redux'
import filters from './filters'
import tasks from './tasks'
import timer from './timer'

const rootReducer = combineReducers({
  filters,
  tasks,
  timer
})

export default rootReducer
